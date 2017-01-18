/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

function doAddPanel() {
  let persistent = document.getElementById("addSidebarPanel_persistentField").checked;
  
  let name = document.getElementById("addSidebarPanel_namePicker").value;
  let url = document.getElementById("addSidebarPanel_locationField").value;
  
  function err(title, message) {
    let stringBundle, brandStringBundle, titleMessage, dialogMessage;
    try {
      stringBundle = Services.strings.createBundle("chrome://communicator/locale/sidebar/sidebar.properties");
      brandStringBundle = Services.strings.createBundle("chrome://branding/locale/brand.properties");
      if (stringBundle) {
        let sidebarName = brandStringBundle.GetStringFromName("sidebarName");
        titleMessage = stringBundle.GetStringFromName(title);
        dialogMessage = stringBundle.GetStringFromName(message);
        dialogMessage = dialogMessage.replace(/%url%/, url);
        dialogMessage = dialogMessage.replace(/%name%/, sidebarName);
      }
    }
    catch (e) {
      titleMessage = "Sidebar";
      dialogMessage = aContentURL + " is not a valid sidebar URL.  No string bundle";
    }

    Services.prompt.alert(null, titleMessage, dialogMessage);

    return false;
  }
  
  if (!name) {
    Services.prompt.alert(null, "Sidebar", "A name is required.");
    return false;
  } else if (!url) {
    Services.prompt.alert(null, "Sidebar", "A URL is required.");
    return false;
  } else if (!/(^http:|^ftp:|^https:)/i.test(url)) {
    Services.prompt.alert(null, "Sidebar", url + " is not a valid Sidebar URL.");
    return false;
  }
  
  window.sidebar[persistent ? "addPersistentPanel" : "addPanel"](name, url, "");
  return true;
}