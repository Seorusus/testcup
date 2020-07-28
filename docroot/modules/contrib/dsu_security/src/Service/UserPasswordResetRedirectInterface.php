<?php

  namespace Drupal\dsu_security\Service;

  use Drupal\Core\Form\FormStateInterface;

  /**
   * Interface UserPasswordResetRedirectInterface
   *
   * @package Drupal\dsu_security\Service
   */
  interface UserPasswordResetRedirectInterface {

    /**
     * Redirect after form submission.
     *
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     */
    public function userResetPasswordFormRedirect(FormStateInterface $form_state);

  }

