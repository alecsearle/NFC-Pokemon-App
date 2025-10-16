async function writePokemon(pokemon) {
  let blockData;
  let respBytes = [];
  let allBytes = [];

  // Block 4
  // - 0, 1: serial number
  // - 2: basic type
  // -3: special type
  blockData = [0, 0, 0, 0];
  blockDatap[0] = pokemon.no >>> 8;
  blockData[1] = pokemon.no & 0xff;
  blockData[2] = pokemon.type[0];
  blockData[3] = pokemon.type[1] || 0;
  respBytes = await nfcManager.nfcHandler.transeive([0xa2, 4, ...blockData]);
  console.warn("block 4", blockData, respBytes);
  if (respBytes[0] !== 0xa) {
    throw new Error("Failed to write");
  }
  allBytes = [...allBytes, ...blockData];

  // Block 5
  // - 0: hp
  // - 1: atk
  // - 2: def
  // - 3: 0
  blockData = [0, 0, 0, 0];
  blockData[0] = pokemon.hp;
  blockData[1] = pokemon.atk;
  blockData[2] = pokemon.def;
  respBytes = await nfcManager.nfcHandler.transeive([0xa2, 5, ...blockData]);
  console.warn("block 5", blockData, respBytes);
  if (respBytes[0] !== 0xa) {
    throw new Error("Failed to write");
  }
  allBytes = [...allBytes, ...blockData];

  // Block 6
  // - 0: satk
  // - 1: sdef
  // - 2: spd
  // - 3: 0
  blockData = [0, 0, 0, 0];
  blockData[0] = pokemon.satk;
  blockData[1] = pokemon.sdef;
  blockData[2] = pokemon.spd;
  respBytes = await nfcManager.nfcHandler.transeive([0xa2, 6, ...blockData]);
  console.warn("block 6", blockData, respBytes);
  if (respBytes[0] !== 0xa) {
    throw new Error("Failed to write");
  }
  allBytes = [...allBytes, ...blockData];

  // Block 7 ~ 11: the name of the pokemon
  let nameBytes = Array.from(pokemon.name).map((_, i) => {
    return pokemon.name.charCodeAt(i);
  });

  while (nameBytes.length < 20) {
    nameBytes.push(0);
  }

  const nameBlockIdx = 7;
  for (let i = 0; i < 5; i++) {
    blockData = nameBytes.slice(4 * i, 4 * i + 4);
    respBytes = await nfcManager.nfcHandler.transeive([0xa2, nameBlockIdx + i, ...blockData]);
    console.warn(`block ${nameBlockIdx + i}`, blockData);
    if (respBytes[0] !== 0xa) {
      throw new Error("Failed to write");
    }
  }
  allBytes = [...allBytes, ...nameBytes];

  return allBytes;
}

export default writePokemon;
