# Integrated Authentication for SeaMonkey and Pale Moon

This extension is forked from an old version of [Integrated Authentication for Firefox](https://github.com/tillig/FirefoxNtlmAuth).

--------

Most people don't realize it, but Firefox and its relatives will do NTLM (Windows pass-through) and SPNEGO (Kerberos, etc.) authentication just like Internet Explorer. Some people solve the issue by going around the browser and hosting IE right inside of it. The other way to do it is to keep your browser's rendering engine and tell it it's OK to use Windows credentials to authenticate with a given site.

The problem is that managing the list of sites you allow the browser to pass-through authenticate with is not straightforward and involves manually manipulating configuration settings.

This add-on makes it easier to manage this list, allowing you to stick with SeaMonkey/Pale Moon but still use integrated/pass-through authentication.

## Installing the Extension

### SeaMonkey / Pale Moon

Check the [releases section](https://github.com/IsaacSchemm/XulNtlmAuth/releases) on GitHub for an .xpi file to install.

### Firefox

You can install *Integrated Authentication for Firefox* through [the Firefox Add-On Gallery](https://addons.mozilla.org/en-US/firefox/addon/13816).

If you want to install this version of the extension, you will need to use a version of Firefox that accepts unsigned add-ons, and probably a version less than Firefox 57.

## Using the Extension

The wiki for the Integrated Authentication for Firefox project [has some extensive help docs explaining usage.](https://github.com/tillig/FirefoxNtlmAuth/wiki) These instructions should apply to this version of the extension as well.

**Note this extension does not actually DO the authentication.** It just allows easier configuration of settings already present in the web browser.
