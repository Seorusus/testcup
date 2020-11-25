<?php

namespace Drupal\FunctionalTests\Installer;

/**
 * Verifies that the installer skipped permission hardening.
 *
 * @group Installer
 */
class InstallerSkipPermissionHardeningTest extends InstallerTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected function prepareEnvironment() {
    parent::prepareEnvironment();
    $this->settings['settings']['skip_permissions_hardening'] = (object) ['value' => TRUE, 'required' => TRUE];
  }

  /**
   * {@inheritdoc}
   */
  protected function setUpSite() {
    $site_directory = $this->container->get('app.root') . '/' . $this->siteDirectory;
    $this->assertDirectoryIsWritable($site_directory);
    $this->assertFileIsWritable($site_directory . '/_settings.php');

    $this->assertSession()->responseContains('All necessary changes to <em class="placeholder">' . $this->siteDirectory . '</em> and <em class="placeholder">' . $this->siteDirectory . '/_settings.php</em> have been made, so you should remove write permissions to them now in order to avoid security risks. If you are unsure how to do so, consult the <a href="https://www.drupal.org/server-permissions">online handbook</a>.');

    parent::setUpSite();
  }

  /**
   * Verifies the expected behaviors of the installation result.
   */
  public function testInstalled() {
    $this->assertSession()->addressEquals('user/1');
    $this->assertSession()->statusCodeEquals(200);
  }

}
