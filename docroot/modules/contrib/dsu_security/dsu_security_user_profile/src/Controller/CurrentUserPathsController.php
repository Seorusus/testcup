<?php

namespace Drupal\dsu_security_user_profile\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;

class CurrentUserPathsController extends ControllerBase {

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function editUserProfile(Request $request) {
    $current_user = \Drupal::currentUser();
    return $this->getUserForm('user', $current_user->id());
  }

  /**
   * Function to redirect the edit route to custom route.
   *
   * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function alter_user_edit_route() {
    $param_uid = \Drupal::routeMatch()->getRawParameter('user');
    $current_user = \Drupal::currentUser();
    // Redirect to the custom url from configuration.
    $config = \Drupal::config('dsu_security_user_profile.settings');
    $result = array_intersect($current_user->getRoles(), $config->get('roles'));
    if ($current_user->id() === $param_uid && !empty($result)) {
      return $this->redirect('dsu_security_user_profile.edit_my_profile');
    }
    else {
      return $this->getUserForm('user', $param_uid);
    }
  }

  /**
   * Load entity form from the entity_id.
   *
   * @param $entity
   * @param $entity_id
   *
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getUserForm($entity, $entity_id) {
    $userObj = \Drupal::entityTypeManager()
      ->getStorage($entity)
      ->load($entity_id);
    $form = \Drupal::entityTypeManager()
      ->getFormObject($entity, 'default')
      ->setEntity($userObj);
    return \Drupal::formBuilder()->getForm($form);
  }

  /**
   * Function to redirect the user route to custom route.
   *
   * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function userPageView() {
    $param_uid = \Drupal::routeMatch()->getRawParameter('user');
    $current_user = \Drupal::currentUser();
    if ($current_user->id() === $param_uid) {
      return $this->redirect('dsu_security_user_profile.my_profile');
    }
    else {
      return $this->renderUserById($param_uid);
    }
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function userProfile(Request $request) {
    $current_user = \Drupal::currentUser();
    return $this->renderUserById($current_user->id());
  }

  /**
   * Render user by user_id.
   * @param $uid
   *
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function renderUserById($uid) {
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder('user');
    $storage = \Drupal::entityTypeManager()->getStorage('user');
    $user = $storage->load($uid);
    $build = $view_builder->view($user, 'default');
    $output = render($build);
    $build = [
      '#markup' => $output,
    ];
    return $build;
  }
}
