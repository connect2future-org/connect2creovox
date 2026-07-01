const validator = require("validator");
const xss = require("xss");

exports.cleanString = (value = "") => {
    return xss(value.trim());
};

exports.validateEmail = (email) => {
    return validator.isEmail(email || "");
};

exports.validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
};

exports.validateBudget = (budget) => {

    const budgets = [

        "Under ₹10K",

        "₹10K – ₹50K",

        "₹50K – ₹1L",

        "₹1L+"

    ];

    return budgets.includes(budget);

};