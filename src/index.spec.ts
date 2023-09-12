import { Item, GildedRose } from './index'

describe('GildedRose', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose();
  });

  // Test pour un élément normal
  it('should degrade normal items quality by 1', () => {
    gildedRose.items = [new Item('normal', 10, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
  });

  // Test pour "Aged Brie"
  it('should increase Aged Brie quality by 1', () => {
    gildedRose.items = [new Item('Aged Brie', 10, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  // Test pour "Sulfuras, Hand of Ragnaros"
  it('should not change Sulfuras quality and sellIn', () => {
    gildedRose.items = [new Item('Sulfuras, Hand of Ragnaros', 10, 80)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });

  // Test pour "Backstage passes"
  it('should increase Backstage passes quality by 1 when sellIn > 10', () => {
    gildedRose.items = [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  it('should increase Backstage passes quality by 2 when 5 < sellIn <= 10', () => {
    gildedRose.items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(22);
  });

  it('should increase Backstage passes quality by 3 when sellIn <= 5', () => {
    gildedRose.items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(23);
  });

  // Tests supplémentaires
  it('should not allow quality to be negative', () => {
    gildedRose.items = [new Item('normal', 10, 0)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should not increase quality over 50', () => {
    gildedRose.items = [new Item('Aged Brie', 10, 50)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it('should set quality of Backstage passes to 0 after concert', () => {
    gildedRose.items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should degrade quality twice as fast for normal items after sell date', () => {
    gildedRose.items = [new Item('normal', 0, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(18);
  });

  it('should increase quality twice as fast for Aged Brie after sell date', () => {
    gildedRose.items = [new Item('Aged Brie', 0, 20)];
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(22);
  });
});