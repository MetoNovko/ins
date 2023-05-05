use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin};
use cw_storage_plus::{Index, IndexList, IndexedMap, Item, Map, MultiIndex};

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    pub purchase_price: Option<Coin>,
    pub transfer_price: Option<Coin>,
}

#[cw_serde]
pub struct NameRecord {
    pub owner: Addr,
}

#[cw_serde]
pub struct AddrRecord {
    pub name: String,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const NAME_RESOLVER: Map<&[u8], NameRecord> = Map::new("name_resolver");
pub const ADDR_RESOLVER: Map<Addr, AddrRecord> = Map::new("addr_resolver");

// pub const NAME_RESOLVER: IndexedMap<&[u8], NameRecord, NameRecordIndexes> = IndexedMap::new(
//     "names",
//     NameRecordIndexes {
//         owner: MultiIndex::new(|d: &NameRecord| d.owner.clone(), "names", "names_owner"),
//     },
// );

