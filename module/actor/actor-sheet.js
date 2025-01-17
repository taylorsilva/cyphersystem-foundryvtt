/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ActorSheet}
*/

export class CypherActorSheet extends ActorSheet {

  /** @override */
  getData() {
    const superData = super.getData();
    const data = superData.data;
    data.data.isGM = game.user.isGM;
    data.actor = superData.actor;
    data.items = superData.items;
    data.owner = superData.owner;
    data.options = superData.options;
    data.effects = superData.effects;

    data.dtypes = ["String", "Number", "Boolean"];

    // Prepare items.
    this.cyphersystem(data);

    return data;
  }

  /**
  * Organize and classify Items for Character sheets.
  *
  * @param {Object} actorData The actor to prepare.
  *
  * @return {undefined}
  */
  cyphersystem(data) {
    const actorData = data.actor.data;

    // Initialize containers
    const equipment = [];
    const abilities = [];
    const skills = [];
    const skillsSortedByRating = [];
    const attacks = [];
    const armor = [];
    const lastingDamage = [];
    const powerShifts = [];
    const cyphers = [];
    const artifacts = [];
    const oddities = [];
    const teenSkills = [];
    const teenSkillsSortedByRating = [];
    const teenAbilities = [];
    const teenAttacks = [];
    const teenArmor = [];
    const teenLastingDamage = [];
    const materials = [];
    const ammo = [];

    // Iterate through items, allocating to containers
    for (let i of data.items) {
      // let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;

      let hidden = false;
      if (actorData.data.settings.hideArchived && i.data.archived) hidden = true;

      // Append to containers
      if (i.type === 'equipment' && !hidden) {
        equipment.push(i);
      }
      else if (i.type === 'ammo' && !hidden) {
        ammo.push(i);
      }
      else if (i.type === 'ability' && !hidden) {
        abilities.push(i);
      }
      else if (i.type === 'skill' && !hidden) {
        skills.push(i);
        skillsSortedByRating.push(i);
      }
      else if (i.type === 'attack' && !hidden) {
        attacks.push(i);
      }
      else if (i.type === 'armor' && !hidden) {
        armor.push(i);
      }
      else if (i.type === 'lasting Damage' && !hidden) {
        lastingDamage.push(i);
      }
      else if (i.type === 'power Shift' && !hidden) {
        powerShifts.push(i);
      }
      else if (i.type === 'cypher' && !hidden) {
        cyphers.push(i);
      }
      else if (i.type === 'artifact' && !hidden) {
        artifacts.push(i);
      }
      else if (i.type === 'oddity' && !hidden) {
        oddities.push(i);
      }
      else if (i.type === 'teen Skill' && !hidden) {
        teenSkills.push(i);
        teenSkillsSortedByRating.push(i);
      }
      else if (i.type === 'teen Ability' && !hidden) {
        teenAbilities.push(i);
      }
      else if (i.type === 'teen Attack' && !hidden) {
        teenAttacks.push(i);
      }
      else if (i.type === 'teen Armor' && !hidden) {
        teenArmor.push(i);
      }
      else if (i.type === 'teen lasting Damage' && !hidden) {
        teenLastingDamage.push(i);
      }
      else if (i.type === 'material' && !hidden) {
        materials.push(i);
      }
    }

    // Sort items alphabetically
    function byNameAscending(itemA, itemB) {
      let nameA = itemA.name.toLowerCase();
      let nameB = itemB.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    equipment.sort(byNameAscending);
    abilities.sort(byNameAscending);
    skills.sort(byNameAscending);
    skillsSortedByRating.sort(byNameAscending);
    attacks.sort(byNameAscending);
    armor.sort(byNameAscending);
    lastingDamage.sort(byNameAscending);
    powerShifts.sort(byNameAscending);
    cyphers.sort(byNameAscending);
    artifacts.sort(byNameAscending);
    oddities.sort(byNameAscending);
    teenSkills.sort(byNameAscending);
    teenSkillsSortedByRating.sort(byNameAscending);
    teenAbilities.sort(byNameAscending);
    teenAttacks.sort(byNameAscending);
    teenArmor.sort(byNameAscending);
    teenLastingDamage.sort(byNameAscending);
    materials.sort(byNameAscending);
    ammo.sort(byNameAscending);

    // sort skills by skill rating
    function bySkillRating(itemA, itemB) {
      let ratingA;
      let ratingB;

      if (itemA.data.skillLevel === 'Specialized') {ratingA = 1}
      else if (itemA.data.skillLevel === 'Trained') {ratingA = 2}
      else if (itemA.data.skillLevel === 'Practiced') {ratingA = 3}
      else if (itemA.data.skillLevel === 'Inability') {ratingA = 4}

      if (itemB.data.skillLevel === 'Specialized') {ratingB = 1}
      else if (itemB.data.skillLevel === 'Trained') {ratingB = 2}
      else if (itemB.data.skillLevel === 'Practiced') {ratingB = 3}
      else if (itemB.data.skillLevel === 'Inability') {ratingB = 4}

      if (ratingA < ratingB) {
        return -1;
      }
      if (ratingA > ratingB) {
        return 1;
      }
      return 0;
    }

    skillsSortedByRating.sort(bySkillRating);
    teenSkillsSortedByRating.sort(bySkillRating);

    // Sort items by archive status
    function byArchiveStatus(itemA, itemB) {
      let ratingA;
      let ratingB;

      if (!itemA.data.archived) itemA.data.archived = false;
      if (!itemB.data.archived) itemB.data.archived = false;

      if (itemA.data.archived === false) {ratingA = 1}
      else if (itemA.data.archived === true) {ratingA = 2}

      if (itemB.data.archived === false) {ratingB = 1}
      else if (itemB.data.archived === true) {ratingB = 2}

      if (ratingA < ratingB) {
        return -1;
      }
      if (ratingA > ratingB) {
        return 1;
      }
      return 0;
    }

    // Sort items by inditified status
    function byIdentifiedStatus(itemA, itemB) {
      let ratingA;
      let ratingB;

      if (itemA.data.identified === false) {ratingA = 2}
      else if (itemA.data.identified === true) {ratingA = 1}

      if (itemB.data.identified === false) {ratingB = 2}
      else if (itemB.data.identified === true) {ratingB = 1}

      if (ratingA < ratingB) {
        return -1;
      }
      if (ratingA > ratingB) {
        return 1;
      }
      return 0;
    }

    equipment.sort(byArchiveStatus);
    abilities.sort(byArchiveStatus);
    skills.sort(byArchiveStatus);
    skillsSortedByRating.sort(byArchiveStatus);
    attacks.sort(byArchiveStatus);
    armor.sort(byArchiveStatus);
    lastingDamage.sort(byArchiveStatus);
    powerShifts.sort(byArchiveStatus);
    cyphers.sort(byIdentifiedStatus);
    cyphers.sort(byArchiveStatus);
    artifacts.sort(byIdentifiedStatus);
    artifacts.sort(byArchiveStatus);
    oddities.sort(byArchiveStatus);
    teenSkills.sort(byArchiveStatus);
    teenSkillsSortedByRating.sort(byArchiveStatus);
    teenAbilities.sort(byArchiveStatus);
    teenAttacks.sort(byArchiveStatus);
    teenArmor.sort(byArchiveStatus);
    teenLastingDamage.sort(byArchiveStatus);
    materials.sort(byArchiveStatus);
    ammo.sort(byArchiveStatus);
    skillsSortedByRating.sort(byArchiveStatus);
    teenSkillsSortedByRating.sort(byArchiveStatus);

    // Assign and return
    actorData.equipment = equipment;
    actorData.abilities = abilities;
    actorData.skills = skills;
    actorData.skillsSortedByRating = skillsSortedByRating;
    actorData.attacks = attacks;
    actorData.armor = armor;
    actorData.lastingDamage = lastingDamage;
    actorData.powerShifts = powerShifts;
    actorData.cyphers = cyphers;
    actorData.artifacts = artifacts;
    actorData.oddities = oddities;
    actorData.teenSkills = teenSkills;
    actorData.teenSkillsSortedByRating = teenSkillsSortedByRating;
    actorData.teenAbilities = teenAbilities;
    actorData.teenAttacks = teenAttacks;
    actorData.teenArmor = teenArmor;
    actorData.teenLastingDamage = teenLastingDamage;
    actorData.materials = materials;
    actorData.ammo = ammo;

  }

  /**
  * Event Listeners
  */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    /**
    * Inventory management
    */

    // Add Inventory Item
    html.find('.item-create').click(clickEvent => {
      const itemCreatedPromise = this._onItemCreate(clickEvent);
      itemCreatedPromise.then(itemData => {
        this.actor.items.get(itemData.id).sheet.render(true);
      });
    });

    // Edit Inventory Item
    html.find('.item-edit').click(clickEvent => {
      const editedItem = $(clickEvent.currentTarget).parents(".item");
      this.actor.items.get(editedItem.data("itemId")).sheet.render(true);
    });

    // Mark Item Identified
    html.find('.identify-item').click(clickEvent => {
      const shownItem = $(clickEvent.currentTarget).parents(".item");
      const item = duplicate(this.actor.items.get(shownItem.data("itemId")));

      let message = game.i18n.format("CYPHERSYSTEM.PCAskingForIdentification", {actor: this.actor.name}) + `<div style='text-align: right'><a class='confirm' data-item='${item._id}' data-actor='${this.actor.id}'><i class="fas fa-check"></i> ${game.i18n.localize("CYPHERSYSTEM.Confirm")}</a></div>`;
      ChatMessage.create({
        content: message,
        whisper: ChatMessage.getWhisperRecipients("GM"),
        blind: true
      })
    });

    // Delete Inventory Item
    html.find('.item-delete').click(clickEvent => {
      const deletedItem = $(clickEvent.currentTarget).parents(".item");
      if (event.ctrlKey || event.metaKey) {
        this.actor.deleteEmbeddedDocuments("Item", [deletedItem.data("itemId")]);
        deletedItem.slideUp(200, () => this.render(false));
      } else {
        const item = duplicate(this.actor.getEmbeddedDocument("Item", deletedItem.data("itemId")));

        if (item.data.archived === true) {
          item.data.archived = false;
        }
        else {
          item.data.archived = true;
        }
        this.actor.updateEmbeddedDocuments("Item", [item]);
      }
    });

    // Add to Quantity
    html.find('.plus-one').click(clickEvent => {
      const shownItem = $(clickEvent.currentTarget).parents(".item");
      const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.quantity = item.data.quantity + amount;
      this.actor.updateEmbeddedDocuments("Item", [item]);
    });

    // Subtract from Quantity
    html.find('.minus-one').click(clickEvent => {
      const shownItem = $(clickEvent.currentTarget).parents(".item");
      const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.quantity = item.data.quantity - amount;
      this.actor.updateEmbeddedDocuments("Item", [item]);
    });

    /**
    * General sheet functions
    */
    // Show item description or send to chat
    html.find('.item-description').click(clickEvent => {
      const shownItem = $(clickEvent.currentTarget).parents(".item");
      const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
      if (event.ctrlKey || event.metaKey) {
        if (item.data.identified === false) return ui.notifications.warn(game.i18n.localize("CYPHERSYSTEM.WarnSentUnidentifiedToChat"));
        let message = "";
        let brackets = "";
        let description = "<hr style='margin:3px 0;'><img class='description-image-chat' src='" + item.img + "' width='50' height='50'/>" + item.data.description;
        let points = "";
        let notes = "";
        let name = item.name;
        if (item.data.notes != "") notes = ", " + item.data.notes;
        if (item.type == "skill" || item.type == "teen Skill") {
          brackets = " (" + item.data.skillLevel + ")";
        } else if (item.type == "power Shift") {
          brackets = " (" + item.data.powerShiftValue + " " + game.i18n.localize("CYPHERSYSTEM.Shifts") + ")";
        } else if (item.type == "ability" || item.type == "teen Ability") {
          points = (item.data.costPoints == "1") ? " " + game.i18n.localize("CYPHERSYSTEM.Point") : " " + game.i18n.localize("CYPHERSYSTEM.Points");
          if (item.data.costPoints != 0 && item.data.costPoints != 0) brackets = " (" + item.data.costPoints + " " + item.data.costPool + points + ")";
        } else if (item.type == "attack") {
          points = (item.data.damage == 1) ? " " + game.i18n.localize("CYPHERSYSTEM.PointOfDamage") : " " + game.i18n.localize("CYPHERSYSTEM.PointsOfDamage");
          let damage = ", " + item.data.damage + " " + points;
          let attackType = item.data.attackType;
          let range = "";
          if (item.data.range != "") range = ", " + item.data.range;
          brackets = " (" + attackType + damage + range + notes + ")";
        } else if (item.type == "armor" || item.type == "teen Armor") {
          brackets = " (" + item.data.armorType + notes + ")";
        } else if (item.type == "lasting Damage"){
          let permanent = "";
          if (item.data.damageType == "Permanent") permanent = ", " + game.i18n.localize("CYPHERSYSTEM.permanent");
          brackets = " (" + item.data.lastingDamagePool + permanent + ")";
        } else {
          if (item.data.level != "") brackets = " (" + game.i18n.localize("CYPHERSYSTEM.level") + " " + item.data.level + ")";
        }
        message = "<b>" + item.type.capitalize() + ": " + name + "</b>" + brackets + description;
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker(),
          content: message
        })
      } else {
        if (item.data.showDescription === true) {
          item.data.showDescription = false;
        }
        else {
          item.data.showDescription = true;
        }
        this.actor.updateEmbeddedDocuments("Item", [item]);
      }
    });

    // Drag events for macros
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      // Find all items on the character sheet.
      html.find('li.item').each((i, li) => {
        // Ignore for the header row.
        if (li.classList.contains("item-header")) return;
        if (li.classList.contains("non-draggable")) return;
        if (li.classList.contains("item-settings")) return;
        // Add draggable attribute and dragstart listener.
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }

    /**
    * Health management for NPCs, Companions, and Communities
    */

    // Increase Health
    html.find('.increase-health').click(clickEvent => {
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      let newValue = this.actor.data.data.health.value + amount;
      this.actor.update({"data.health.value": newValue});
    });

    // Decrease Health
    html.find('.decrease-health').click(clickEvent => {
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      let newValue = this.actor.data.data.health.value - amount;
      this.actor.update({"data.health.value": newValue});
    });

    // Reset Health
    html.find('.reset-health').click(clickEvent => {
      this.actor.update({
        "data.health.value": this.actor.data.data.health.max
      }).then(item => {
        this.render();
      });
    });
  }

  /**
  * Handle dropping of an item reference or item data onto an Actor Sheet
  * @param {DragEvent} event     The concluding DragEvent which contains drop data
  * @param {Object} data         The data transfer extracted from the event
  * @return {Promise<Object>}    A data object which describes the result of the drop
  * @private
  */
  async _onDropItem(event, data) {
    event.preventDefault();
    // if (!this.actor.owner) return false;
    const item = await Item.fromDropData(data);
    const itemData = duplicate(item.data);

    // Handle item sorting within the same Actor
    const actor = this.actor;
    let sameActor = (data.actorId === actor.data._id) || (actor.isToken && (data.tokenId === actor.token.id));
    if (sameActor) return this._onSortItem(event, itemData);

    // Get origin actor. If any, get originItem
    let originActor;
    if (!data.tokenId) {
      originActor = game.actors.get(data.actorId);
    } else {
      originActor = canvas.tokens.get(data.tokenId).actor;
    }
    let originItem;
    if (originActor) { originItem = originActor.items.find(i => i.data._id === item.data._id) };

    // Create the owned item or increase quantity
    const itemOwned = actor.items.find(i => i.data.name === item.data.name && i.data.type === item.data.type);

    let hasQuantity = false;

    if ("quantity" in item.data.data) hasQuantity = true;

    // Activate settings for items
    if (itemData.type == "artifact") actor.update({"data.settings.equipment.artifacts": true});
    if (itemData.type == "cypher") actor.update({"data.settings.equipment.cyphers": true});
    if (itemData.type == "oddity") actor.update({"data.settings.equipment.oddities": true});
    if (itemData.type == "material") actor.update({"data.settings.equipment.materials": true});
    if (itemData.type == "ammo") actor.update({"data.settings.equipment.ammo": true});
    if (itemData.type == "power Shift") actor.update({"data.settings.powerShifts.active": true});
    if (itemData.type == "lasting Damage") actor.update({"data.settings.lastingDamage.active": true});
    if (itemData.type == "teen lasting Damage") actor.update({"data.settings.lastingDamage.active": true});

    if (!hasQuantity) {
      if (!itemOwned) this._onDropItemCreate(itemData);
      if (itemOwned) return ui.notifications.warn(game.i18n.format("CYPHERSYSTEM.AlreadyHasThisItem", {actor: actor.name}));
      if ((event.ctrlKey || event.metaKey) && originActor) {
        let d = new Dialog({
          title: game.i18n.localize("CYPHERSYSTEM.ItemShouldBeArchivedOrDeleted"),
          content: "",
          buttons: {
            move: {
              icon: '<i class="fas fa-archive"></i>',
              label: game.i18n.localize("CYPHERSYSTEM.Archive"),
              callback: (html) => archiveItem()
            },
            moveAll: {
              icon: '<i class="fas fa-trash"></i>',
              label: game.i18n.localize("CYPHERSYSTEM.Delete"),
              callback: (html) => deleteItem()
            },
            cancel: {
              icon: '<i class="fas fa-times"></i>',
              label: game.i18n.localize("CYPHERSYSTEM.Cancel"),
              callback: () => { }
            }
          },
          default: "move",
          close: () => { }
        });
        d.render(true);

        function archiveItem() {
          originItem.update({"data.archived": true})
        }

        function deleteItem() {
          originItem.delete();
        }
      }
    } else {
      if (event.ctrlKey || event.metaKey) {
        let maxQuantity = item.data.data.quantity;
        if (maxQuantity <= 0 && maxQuantity != null) return ui.notifications.warn(game.i18n.localize("CYPHERSYSTEM.CannotMoveNotOwnedItem"));
        let quantity = 1;
        moveDialog(quantity, itemData);

        function moveDialog(quantity, itemData) {
          // if (!quantity) quanitity = 1;
          let d = new Dialog({
            title: game.i18n.format("CYPHERSYSTEM.MoveItem", {name: itemData.name}),
            content: createContent(quantity),
            buttons: buttons(),
            default: "move",
            close: () => { }
          });
          d.render(true);
        }

        function createContent(quantity) {
          let maxQuantityText = "";
          if (maxQuantity != null) maxQuantityText = `&nbsp;&nbsp;${game.i18n.localize("CYPHERSYSTEM.Of")} ${maxQuantity}`;
          let content = `<div align="center">
          <label style='display: inline-block; width: 98px; text-align: right'><b>${game.i18n.localize("CYPHERSYSTEM.Quantity")}/${game.i18n.localize("CYPHERSYSTEM.Units")}: </b></label>
          <input name='quantity' id='quantity' style='width: 75px; margin-left: 5px; margin-bottom: 5px;text-align: center' type='text' value=${quantity} data-dtype='Number'/>` + maxQuantityText + `</div>`;
          return content;
        }

        function buttons() {
          if (maxQuantity != null) {
            return ({
              move: {
                icon: '<i class="fas fa-share-square"></i>',
                label: game.i18n.localize("CYPHERSYSTEM.Move"),
                callback: (html) => moveItems(html.find('#quantity').val(), itemData)
              },
              moveAll: {
                icon: '<i class="fas fa-share-square"></i>',
                label: game.i18n.localize("CYPHERSYSTEM.MoveAll"),
                callback: (html) => moveItems(maxQuantity, itemData)
              },
              cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("CYPHERSYSTEM.Cancel"),
                callback: () => { }
              }
            })
          } else {
            return ({
              move: {
                icon: '<i class="fas fa-share-square"></i>',
                label: game.i18n.localize("CYPHERSYSTEM.Move"),
                callback: (html) => moveItems(html.find('#quantity').val(), itemData)
              },
              cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("CYPHERSYSTEM.Cancel"),
                callback: () => { }
              }
            })
          }
        }

        function moveItems(quantity, itemData) {
          quantity = parseInt(quantity);
          if (item.data.data.quantity != null && (quantity > item.data.data.quantity || quantity <= 0)) {
            moveDialog(quantity, itemData);
            return ui.notifications.warn(game.i18n.format("CYPHERSYSTEM.CanOnlyMoveCertainAmountOfItems", {max: item.data.data.quantity}));
          }
          if (item.data.data.quantity && originActor) {
            let oldQuantity = item.data.data.quantity - parseInt(quantity);
            originItem.update({"data.quantity": oldQuantity});
          }
          if (!itemOwned) {
            itemData.data.quantity = quantity;
            actor.createEmbeddedDocuments("Item", [itemData]);
          } else {
            let newQuantity = parseInt(itemOwned.data.data.quantity) + parseInt(quantity);
            itemOwned.update({"data.quantity": newQuantity});
          }
        }
      } else {
        if (!itemOwned) {
          if (!item.data.data.quantity) {
            itemData.data.quantity = 0;
          }
          this._onDropItemCreate(itemData);
        } else {
          let newQuantity = itemOwned.data.data.quantity + item.data.data.quantity;
          itemOwned.update({"data.quantity": newQuantity});
        }
      }
    }
  }

  /**
  * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
  * @param {Event} event   The originating click event
  * @private
  */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const types = {
      "ability": "[" + game.i18n.localize("CYPHERSYSTEM.NewAbility") + "]",
      "ammo": "[" + game.i18n.localize("CYPHERSYSTEM.NewAmmo") + "]",
      "armor": "[" + game.i18n.localize("CYPHERSYSTEM.NewArmor") + "]",
      "artifact": "[" + game.i18n.localize("CYPHERSYSTEM.NewArtifact") + "]",
      "attack": "[" + game.i18n.localize("CYPHERSYSTEM.NewAttack") + "]",
      "cypher": "[" + game.i18n.localize("CYPHERSYSTEM.NewCypher") + "]",
      "equipment": "[" + game.i18n.localize("CYPHERSYSTEM.NewEquipment") + "]",
      "lasting Damage": "[" + game.i18n.localize("CYPHERSYSTEM.NewLastingDamage") + "]",
      "material": "[" + game.i18n.localize("CYPHERSYSTEM.NewMaterial") + "]",
      "oddity": "[" + game.i18n.localize("CYPHERSYSTEM.NewOddity") + "]",
      "power Shift": "[" + game.i18n.localize("CYPHERSYSTEM.NewPowerShift") + "]",
      "skill": "[" + game.i18n.localize("CYPHERSYSTEM.NewSkill") + "]",
      "teen Ability": "[" + game.i18n.localize("CYPHERSYSTEM.NewTeenAbility") + "]",
      "teen Armor": "[" + game.i18n.localize("CYPHERSYSTEM.NewTeenArmor") + "]",
      "teen Attack": "[" + game.i18n.localize("CYPHERSYSTEM.NewTeenAttack") + "]",
      "teen lasting Damage": "[" + game.i18n.localize("CYPHERSYSTEM.NewTeenLastingDamage") + "]",
      "teen Skill": "[" + game.i18n.localize("CYPHERSYSTEM.NewTeenSkill") + "]",
      "default": "[" + game.i18n.localize("CYPHERSYSTEM.NewDefault") + "]"
    };
    const name = (types[type] || types["default"]);

    // Finally, create the item!
    return Item.create({type: type, data, name: name}, {parent: this.actor});
  }
}
