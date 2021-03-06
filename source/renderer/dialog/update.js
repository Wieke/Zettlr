/* global $ */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        UpdateDialog class
 * CVM-Role:        View
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     If there's a new update, this dialog lets you download it.
 *
 * END HEADER
 */

const ZettlrDialog = require('./zettlr-dialog.js')

class UpdateDialog extends ZettlrDialog {
  constructor () {
    super()
    this._dialog = 'update'
  }

  preInit (data) {
    let matomoData = '?pk_campaign=RecurringUsers&pk_source=app&pk_medium=ZettlrUpdater'
    data.downloadLink = 'https://www.zettlr.com/download/' + matomoData
    if ($('body').hasClass('darwin')) {
      data.downloadLink = 'https://www.zettlr.com/download/macos' + matomoData
    } else if ($('body').hasClass('win32')) {
      data.downloadLink = 'https://www.zettlr.com/download/win32' + matomoData
    } else if ($('body').hasClass('linux')) {
      data.downloadLink = 'https://www.zettlr.com/download/linux' + matomoData
    }
    return data
  }
}

module.exports = UpdateDialog
