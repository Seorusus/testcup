<?php

  namespace Drupal\dsu_security\Service;

  use Drupal\Core\Form\FormStateInterface;
  use Symfony\Component\HttpFoundation\RedirectResponse;

  /**
   * Class UserPasswordResetRedirect
   *
   * @package Drupal\dsu_security\Service
   */
  class UserPasswordResetRedirect implements UserPasswordResetRedirectInterface {

    /**
     * UserPasswordResetRedirect constructor.
     */
    public function __construct() {

    }

    /**
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     */
    public function userResetPasswordFormRedirect(FormStateInterface $form_state) {
      // Resets the form error status so no form fields are highlighted.
      $form_state->setRebuild();
      $form_state->clearErrors();
      // Removes "username is not recognized as a username or an email address."
      drupal_get_messages(NULL, TRUE);
      // Set message for user display.
      if (\Drupal::config('user.settings')->get('notify.password_reset')) {
        drupal_set_message(t('An email with further instructions has been sent.'), 'status');
      }

      // Redirect on user login page.
      $response = new RedirectResponse(\Drupal::url('user.page'));
      $request = \Drupal::request();
      $request->getSession()->save();
      $response->prepare($request);
      \Drupal::service('kernel')->terminate($request, $response);
      $response->send();
    }
  }
