# Field Encrypt Component
This module helps us to encrypt the field data for security.

----
# Requirements
- Encrypt Module
- Real AES Module
- Key Module
- Field Encrypt Module

----
# Description
**Lightnest components: Encryption** provides an encryption method plugin for the
[Encrypt](https://drupal.org/project/encrypt) module.

----
# Usage
1. Encrypt the field data for security

----
# Installation
* Before installation, Generate the encrypted key from below command. Key must be stored in the project root. Execute below command on terminal
  * **dd if=/dev/urandom bs=32 count=1 | base64 -i - > encrypt.key** (encrypt.key is file name)
- Enable Lightnest components: Encryption module.
- Once enabled the module:
  * Make sure **key** exist under the *Configuration > System > Keys*
  * Make sure **Encryption profile** exist under the *Configuration > System > Encryption profiles*
  * *Configuration > System > Field Encrypt Settings*. Default field encryption is already enabled.If you want to encrypt more fields, you can check the field and click on **Save configuration** button.
* Navigate to *Configuration > People > Account settings > Manage Fields* and click **Add Field**

  * **Field Type:** choose *Text (plain)*
  * **Field Name:** *Encrypted Field*, or another name of your choosing.
  * Click *Save and Continue*
  * On the next page, beneath the normal Field Storage options, you should see a new checkbox labeled *Encrypt Field*. Check that box and the form will expand with some options.
   * **Properties:** check *Text value* – Here we’re choosing which parts of the field data will be encrypted. Since this is a plain text field, there is only one property available to encrypt.
   * **Encryption Profile:** choose *Field Encryption AES Profile* or whatever you named the encryption profile in the previous setup.
   * **Uncacheable:** Check this. This will make sure your unencrypted data will not be exposed in the cache but will have a negative impact on your performance. Whether or not you want encrypted data to be cacheable in your actual usage of the module is up to you, but there are trade-offs in both cases. *Uncacheable* is the more secure option, but has a performance cost.
   * Click **Save Field Settings**
   * Create new data for encrypted fields and validate it on *admin/config/system/field-encrypt/field-overview* URL.
