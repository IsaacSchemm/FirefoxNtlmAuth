/// <reference path="~/chrome/content/common.js" />
if (!com) var com = {};
if (!com.paraesthesia) com.paraesthesia = {};
if (!com.paraesthesia.ntlmauth) com.paraesthesia.ntlmauth = {};
if (!com.paraesthesia.ntlmauth.EditDialog) com.paraesthesia.ntlmauth.EditDialog = {};

if (!com.paraesthesia.ntlmauth.EditDialog.Listbox) com.paraesthesia.ntlmauth.EditDialog.Listbox =
{
	clear: function(lbox) {
		lbox.clearSelection();
		while(lbox.itemCount > 0)
		{
			lbox.removeItemAt(0);
		}
	},

	contains: function(lbox, value) {
		for (var i = 0; i < lbox.itemCount; i++) {
			var listItem = lbox.getItemAtIndex(i);
			if (listItem.label && (listItem.label.toLowerCase() == value.toLowerCase())) {
				return true;
			}
		}
		return false;
	},

	databind: function(lbox, data) {
		this.clear(lbox);
		for (var i = 0; i < data.length; i++) {
			lbox.appendItem(data[i]);
		}
	},

	removeSelectedItem: function(lbox) {
		lbox.removeItemAt(lbox.getIndexOfItem(lbox.selectedItem));
	},

	toArray: function(lbox) {
		var list = [];
		for (var i = 0; i < lbox.itemCount; i++) {
			var listItem = lbox.getItemAtIndex(i);
			list.push(listItem.label);
		}
		return list;
	}
};

if (!com.paraesthesia.ntlmauth.EditDialog.DialogController) com.paraesthesia.ntlmauth.EditDialog.DialogController =
{
	addButton: null,
	addSiteTextBox: null,
	enableNonFqdnCheckbox: null,
	removeButton: null,
	siteListBox: null,

	addSite: function () {
		var url = this.addSiteTextBox.value;
		if (!com.paraesthesia.ntlmauth.EditDialog.Listbox.contains(this.siteListBox, url)) {
			var newSiteList = com.paraesthesia.ntlmauth.EditDialog.Listbox.toArray(this.siteListBox);
			newSiteList.push(url);
			com.paraesthesia.ntlmauth.Preferences.saveSiteList(newSiteList);

			// Rather than re-loading the preferences, we assume the list box always contains
			// the current set of preferences. We just need to sort the items and redisplay.
			// Hopefully this avoids the save/load race condition some folks were seeing.
			newSiteList.sort();
			com.paraesthesia.ntlmauth.EditDialog.Listbox.databind(this.siteListBox, newSiteList);
		}
		this.addSiteTextBox.value = "";
		this.updateAddButtonDisabled(this.addSiteTextBox);
	},

	help: function () {
		window.open("https://github.com/IsaacSchemm/XulNtlmAuth/wiki");
	},

	initialize: function () {
		this.addButton = document.getElementById("addButton");
		this.addSiteTextBox = document.getElementById("addSiteTextBox");
		this.enableNonFqdnCheckbox = document.getElementById("enableNonFqdnCheckbox");
		this.removeButton = document.getElementById("removeButton");
		this.siteListBox = document.getElementById("siteListBox");

		this.addSiteTextBox.focus();
		this.populateSiteList();
		// TODO: Get the pref for fqdn and populate.
		this.enableNonFqdnCheckbox.checked = com.paraesthesia.ntlmauth.Preferences.getNonFqdnEnabled();
		// TODO: Put the current web site in the textbox IF it's not already in the list.
		this.updateAddButtonDisabled(this.addSiteTextBox);

	},

	onAddTextboxChanged: function (textbox) {
		this.updateAddButtonDisabled(textbox);
	},

	onAddTextboxKeyUp: function (event) {
		if (event.keyCode == KeyEvent.DOM_VK_RETURN && !this.addButton.disabled) {
			this.addSite();
		}
	},

	populateSiteList: function () {
		var list = com.paraesthesia.ntlmauth.Preferences.loadSiteList();
		com.paraesthesia.ntlmauth.EditDialog.Listbox.databind(this.siteListBox, list);
	},

	removeSite: function () {
		com.paraesthesia.ntlmauth.EditDialog.Listbox.removeSelectedItem(this.siteListBox);
		var newSiteList = com.paraesthesia.ntlmauth.EditDialog.Listbox.toArray(this.siteListBox);
		com.paraesthesia.ntlmauth.Preferences.saveSiteList(newSiteList);
	},

	toggleNonFqdn: function () {
		com.paraesthesia.ntlmauth.Preferences.setNonFqdnEnabled(this.enableNonFqdnCheckbox.checked);
	},

	updateAddButtonDisabled: function (textbox) {
		var url = textbox.value;
		this.addButton.disabled = !com.paraesthesia.ntlmauth.String.isValidUrl(url);
	},

	updateFormFromSelection: function (listbox) {
		this.removeButton.disabled = (this.siteListBox.selectedItem == null);
	}
};
