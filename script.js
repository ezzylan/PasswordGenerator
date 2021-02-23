const charAmountRange = document.getElementById('charAmountRange');
const charAmountNum = document.getElementById('charAmountNum');
const form = document.getElementById('pw-gen-form');
const passwordDisplay = document.getElementById('password-display');
const includeUCElement = document.getElementById('includeUC');
const includeNumElement = document.getElementById('includeNum');
const includeSymElement = document.getElementById('includeSym');

const UC_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LC_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUM_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYM_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

charAmountNum.addEventListener('input', syncCharAmount);
charAmountRange.addEventListener('input', syncCharAmount);

form.addEventListener('submit', e => {
    e.preventDefault();
    const charAmount = charAmountNum.value;
    const includeUC = includeUCElement.checked;
    const includeNum = includeNumElement.checked;
    const includeSym = includeSymElement.checked;
    const password = generatePassword(charAmount, includeUC, includeNum, includeSym);
    passwordDisplay.innerText = password;
})

function syncCharAmount(e) {
    const value = e.target.value;
    charAmountNum.value = value;
    charAmountRange.value = value;
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) { array.push(i); }
    return array;
}

function generatePassword(charAmount, includeUC, includeNum, includeSym) {
    let charCodes = LC_CHAR_CODES;
    if (includeUC) { charCodes = charCodes.concat(UC_CHAR_CODES); }
    if (includeNum) { charCodes = charCodes.concat(NUM_CHAR_CODES); }
    if (includeSym) { charCodes = charCodes.concat(SYM_CHAR_CODES); }

    const passwordChars = [];
    for (let i = 0; i < charAmount; i++) {
        const character = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordChars.push(String.fromCharCode(character));
    }

    return passwordChars.join('');
}