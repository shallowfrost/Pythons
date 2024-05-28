// data.js
import { handleHelpCommand, handleListCommand, handlePriceCommand } from '../scripts/handlers.js';

const dataMassExport = {
  'commands': [
    {
      command: '/help',
      args: '[command]',
      description: 'Provides information about other commands.',
      usage: '`/help` Provides a list of commands.<br>`/help` Followed by another command gives detailed information for the command.',
      execute: handleHelpCommand
    },
    {
      command: '/list',
      args: '[option]',
      description: 'Lists details based on the option provided.',
      usage: `Use '/list' to get all morphs with their IDs.<br>
              '/list morphs' to get just the morph names.<br>
              '/list sex' to get the usable sexes and their IDs.<br>
              '/list price' to get morphs with their corresponding prices.<br>
              '/list detailed' to get detailed information including ID, morph name, and price.`,
      execute: handleListCommand
    },    
    {
      command: '/price',
      args: '<sex> <weight> <morph> [morphs]',
      description: 'Returns a price given the sex, weight, and morphs of a python.',
      usage: '/price <sex> <weight> <morph> [additional morphs] - Provide the sex (0 for unsexed, 1 for male, 2 for female), weight in grams, and morph(s) to get the price of a python.',
      execute: handlePriceCommand
    }
  ],
  'sex_adjustment': {
    0: "no sex",
    1: "male",
    2: "female",
  },
  'morph_price': {
    0: 45.99,
    1: 91.79,
    2: 159.87,
    3: 95.68,
    4: 109.18,
    5: 115.12,
    6: 211.85,
    7: 264.32,
    8: 698.92,
    9: 226.48,
    10: 320.22
  },
  'all_morphs': {
    0: 'Normal',
    1: 'Pastel',
    2: 'Yellow Belly',
    3: 'Enchi',
    4: 'Fire',
    5: 'Leopard',
    6: 'Hypo',
    7: 'Clown',
    8: 'Desert Ghost',
    9: 'Albino',
    10: 'Piebald',
    11: 'Bamboo',
    12: 'Super Bamboo',
    13: 'Banana',
    14: 'Super Banana',
    15: 'Blackhead',
    16: 'Super Blackhead',
    17: 'Black Pastel',
    18: 'Blade',
    19: 'Super Blade',
    20: 'Bongo',
    21: 'Super Bongo',
    22: 'Butter',
    23: 'Super Butter',
    24: 'Calico',
    25: 'Candy',
    26: 'Het Candy',
    27: 'Candino',
    28: 'Champagne',
    29: 'Chocolate',
    30: 'Super Chocolate',
    31: 'Cinnamon',
    32: 'Clown',
    33: 'Het Clown',
    34: 'Confusion',
    35: 'Coral Glow',
    36: 'Super Coral Glow',
    37: 'Cryptic',
    38: 'Het Cryptic',
    39: 'Cypress',
    40: 'Desert Ghost',
    41: 'Disco',
    42: 'Super Disco',
    43: 'Enchi',
    44: 'Super Enchi',
    45: 'Enhancer',
    46: 'Het Enhancer',
    47: 'Fire',
    48: 'Super Fire',
    49: 'Genetic Stripe',
    50: 'Het Genetic Stripe',
    51: 'GeneX',
    52: 'GHI',
    53: 'Super GHI',
    54: 'Granite',
    55: 'Gravel',
    56: 'Super Gravel',
    57: 'Het Red Axanthix',
    58: 'Hidden Gene Woma',
    59: 'Huffman',
    60: 'Hurricane',
    61: 'Super Hurricane',
    62: 'Hypo',
    63: 'Het Hypo',
    64: 'Lavender Albino',
    65: 'Het Lavender Albino',
    66: 'Leopard',
    67: 'Lesser',
    68: 'Super Lesser',
    69: 'Lucifer',
    70: 'Mahogany',
    71: 'Super Mahogany',
    72: 'Mojave',
    73: 'Super Mojave',
    74: 'Monsoon',
    75: 'Fractal',
    76: 'Mystic',
    77: 'Super Mystic',
    78: 'Orange Dream',
    79: 'Super Orange Dream',
    80: 'Orange Ghost',
    81: 'Het Orange Ghost',
    82: 'Paint',
    83: 'Het Paint',
    84: 'Pastel',
    85: 'Super Pastel',
    86: 'Phantom',
    87: 'Super Phantom',
    88: 'Piebald',
    89: 'Het Piebald',
    90: 'Pinstripe',
    91: 'Puzzle',
    92: 'Rainbow',
    93: 'Het Rainbow',
    94: 'Red Stripe',
    95: 'Super Red Stripe',
    96: 'Russo',
    97: 'Super Russo',
    98: 'Spark',
    99: 'Super Spark',
    100: 'Special',
    101: 'Super Special',
    102: 'Specter',
    103: 'Super Specter',
    104: 'Spider',
    105: 'Spotnose',
    106: 'Stranger',
    107: 'Sugar',
    108: 'Sunset',
    109: 'Het Sunset',
    110: 'Toffee',
    111: 'Het Toffee',
    112: 'Toffino',
    113: 'Tri-stripe',
    114: 'Het Tri-Stripe',
    115: 'Ultramel',
    116: 'Het Ultramel',
    117: 'Vanilla',
    118: 'Super Vanilla',
    119: 'Wookie',
    120: 'Yellow Belly',
    121: 'Super Yellow Belly',
    122: 'Zebra',
    123: 'Het Zebra'
  }
};

export { dataMassExport };
