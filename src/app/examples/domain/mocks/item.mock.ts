import { ItemModel } from '../models/item.model';

export function getItemMock(): ItemModel {
    const itemModel: ItemModel = new ItemModel('Everton');
    return itemModel;
}

export function getListOfItemMock(): ItemModel[] {
    const itemModel1: ItemModel = new ItemModel('Everton');
    const itemModel2: ItemModel = new ItemModel('Ana');
    const itemModel3: ItemModel = new ItemModel('Sueli');
    const itemModel4: ItemModel = new ItemModel('Roberto');
    const itemModel5: ItemModel = new ItemModel('Daniel');
    const itemModel6: ItemModel = new ItemModel('Luciano');

    const listOfItemMock: ItemModel[] = [itemModel1, itemModel2, itemModel3, itemModel4, itemModel5, itemModel6];

    return listOfItemMock;
}