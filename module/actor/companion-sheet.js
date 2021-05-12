/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ActorSheet}
*/
export class CypherActorSheetCompanion extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["cyphersystem", "sheet", "actor", "companion"],
      template: "systems/cyphersystem/templates/companion-sheet.html",
      width: 650,
      height: 700,
      resizable: false,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body"}],
      scrollY: [".sheet-body", ".tab", ".skills", ".description", ".settings", ".items"]
    });
  }
}