/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.
*/

if (!com) var com = {};
if (!com.paraesthesia) com.paraesthesia = {};
if (!com.paraesthesia.ntlmauth) com.paraesthesia.ntlmauth = {};
if (!com.paraesthesia.ntlmauth.ToolsMenu) com.paraesthesia.ntlmauth.ToolsMenu =
{
	showEditorDialog: function() {
		window.open("chrome://ntlmauth/content/edit-dialog.xul", "ntlmauth-edit-dialog", "chrome,alwaysRaised=yes,centerscreen=yes,dependent=yes,modal=yes,dialog=yes,resizable=no");
	}
};
