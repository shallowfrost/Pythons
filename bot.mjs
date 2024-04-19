import "./styles.css";
import "./index.html";
import "./data.js";

const morph_price = window.morph_price
const sex_adjustment = window.sex_adjustment;
const morph_names = window.morph_names;
const continued_morphs = window.continued_morphs;
const userMessage = window.userMessage

// This code is based on the following example:
// https://discordpy.readthedocs.io/en/stable/quickstart.html#a-minimal-bot

function onMessage() {
if (userMessage.startsWith("#help")) {
    const response = [
    "price,[sex],[weight],[Morph],[Morph],[Morph],etc... ",
    "No sex = 0 ",
    "Male = 1 ",
    "Female = 2 ",
    "Example: #price,0,200,1 would be an unsexed pastel at 200 grams.",
    "'#list' to see supported morphs"
    ]
}

if (userMessage.startsWith("#list")) {
    const response = [
    "0. Normal\n1. Pastel\n2. Yellow Belly\n3. Enchi\n4. Fire\n5. Leopard\n6. Hypo\n7. Clown\n8. Desert Ghost\n9. Albino\n10. Piebald",
    "#\n11. Bamboo\n12. Super Bamboo\n13. Banana\n14. Super Banana\n15. Blackhead\n16. Super Blackhead\n17. Black Pastel\n18. Blade\n19. Super Blade\n20. Bongo\n21. Super Bongo\n22. Butter\n23. Super Butter\n24. Calico\n25. Candy\n26. Het Candy\n27. Candino\n28. Champagne\n29. Chocolate\n30. Super Chocolate\n31. Cinnamon\n32. Clown\n33. Het Clown\n34. Confusion\n35. Coral Glow\n36. Super Coral Glow\n37. Cryptic\n38. Het Cryptic\n39. Cypress\n40. Desert Ghost\n41. Disco\n42. Super Disco\n43. Enchi\n44. Super Enchi\n45. Enhancer\n46. Het Enhancer\n47. Fire\n48. Super Fire\n49. Genetic Stripe\n50. Het Genetic Stripe\n51. GeneX\n52. GHI\n53. Super GHI\n54. Granite\n55. Gravel\n56. Super Gravel\n57. Het Red Axanthix\n58. Hidden Gene Woma\n59. Huffman\n60. Hurricane\n61. Super Hurricane\n62. Hypo\n63. Het Hypo\n64. Lavender Albino\n65. Het Lavender Albino\n66. Leopard\n67. Lesser\n68. Super Lesser\n69. Lucifer\n70. Mahogany\n71. Super Mahogany\n72. Mojave\n73. Super Mojave\n74. Monsoon\n75. Fractal\n76. Mystic\n77. Super Mystic\n78. Orange Dream\n79. Super Orange Dream\n80. Orange Ghost\n81. Het Orange Ghost\n82. Paint\n83. Het Paint\n84. Pastel\n85. Super Pastel\n86. Phantom\n87. Super Phantom\n88. Piebald\n89. Het Piebald\n90. Pinstripe\n91. Puzzle\n92. Rainbow\n93. Het Rainbow\n94. Red Stripe\n95. Super Red Stripe\n96. Russo\n97. Super Russo\n98. Spark\n99. Super Spark\n100. Special\n101. Super Special\n102. Specter\n103. Super Specter\n104. Spider\n105. Spotnose\n106. Stranger\n107. Sugar\n108. Sunset\n109. Het Sunset\n110. Toffee\n111. Het Toffee\n112. Toffino\n113. Tri-stripe\n114. Het Tri-Stripe\n115. Ultramel\n116. Het Ultramel\n117. Vanilla\n118. Super Vanilla\n119. Wookie\n120. Yellow Belly\n121. Super Yellow Belly\n122. Zebra\n123. Het Zebra"
    ]
}
return(response)
}

// Assuming you have the following data (replace with actual values):
const sex = 1; // 0 for unsexed, 1 for male, 2 for female
const weight = 200; // Weight in grams
const morphs = ["1", "2", "3"]; // Array of morph IDs (e.g., ["1", "2", "3"])

// Calculate total price based on morphs
function calculateTotalPrice(morphs) {
  let total_price = 0;
  let morph_names_str = "";

  for (const morph of morphs) {
    try {
      const morphNum = parseInt(morph);
      total_price += morph_price[morphNum];
      morph_names_str += `${morph_names[morphNum]}, `;
    } catch (error) {
      console.log(`Invalid morph input: ${morph}`);
      // Return an empty object in case of an error
      return { total_price_str: "", morph_names_str: "" };
    }
  }

  // Remove the last comma and space
  morph_names_str = morph_names_str.slice(0, -2);

  // Format total price as a dollar string
  const total_price_str = `$${total_price.toFixed(2)}`;

  return { total_price_str, morph_names_str };
}

// Get adjusted sex string
const sex_str = sex === 0 ? "unsexed" : sex === 1 ? "male" : "female";

// Calculate total price
const { total_price_str, morph_names_str } = calculateTotalPrice(morphs);

// Generate the response
const response = `Total price for a (${sex_str}) ${morph_names_str} Ball Python at ${weight} grams is ${total_price_str}.`;

module.exports = { calculateTotalPrice };
module.exports = {  };
module.exports = {  };
module.exports = {  };


window.response = response;