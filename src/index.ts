export class Item {
  constructor(public name: string, public sellIn: number, public quality: number) {}
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const updater = ItemUpdaterFactory.create(item);
      updater.update();
    }
    return this.items;
  }
}

abstract class ItemUpdater {
  constructor(protected item: Item) {}

  abstract update(): void;

  increaseQuality(amount: number) {
    this.item.quality = Math.min(this.item.quality + amount, 50);
  }

  decreaseQuality(amount: number) {
    this.item.quality = Math.max(this.item.quality - amount, 0);
  }

  decreaseSellIn() {
    this.item.sellIn -= 1;
  }
}

class ItemUpdaterFactory {
  static create(item: Item): ItemUpdater {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieUpdater(item);
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasUpdater(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassUpdater(item);
      default:
        return new NormalItemUpdater(item);
    }
  }
}

class AgedBrieUpdater extends ItemUpdater {
  update() {
    this.increaseQuality(1);
    this.decreaseSellIn();
    if (this.item.sellIn < 0) {
      this.increaseQuality(1);
    }
  }
}

class SulfurasUpdater extends ItemUpdater {
  update() {
    
  }
}

class BackstagePassUpdater extends ItemUpdater {
  update() {
    if (this.item.sellIn > 10) this.increaseQuality(1);
    else if (this.item.sellIn > 5) this.increaseQuality(2);
    else if (this.item.sellIn > 0) this.increaseQuality(3);
    else this.item.quality = 0;

    this.decreaseSellIn();
  }
}

class NormalItemUpdater extends ItemUpdater {
  update() {
    this.decreaseQuality(1);
    this.decreaseSellIn();
    if (this.item.sellIn < 0) {
      this.decreaseQuality(1);
    }
  }
}