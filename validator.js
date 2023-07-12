function Validator(formSelector) {
    // Form chứa tất cả các rules
    var formRules = {};
    // Tạo ra object để lưu các rules.Tất cả các rules dc được defined into validatorRules
    /**
     * Quy ước tạo rule:
     * - Nếu có lỗi thì return error message
     * - Nếu không có lỗi thì return undefined
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : " Vui lòng nhập trường này";
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Vui lòng nhập email";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : ` Vui lòng nhập ít nhất ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : ` Vui lòng nhập ít nhất ${max} ký tự`;
            };
        },
    };

    // Lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);
    // Chỉ xử lý khi có element trong DOM
    if (formElement) {
        var inputs = formElement.querySelectorAll("[name][rules]");
        for (var input of inputs) {
            var rules = input.getAttribute("rules").split("|");
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(":");
                if (isRuleHasValue) {
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                    // console.log(validatorRules[rule](ruleInfo[1]));
                }
                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            // formRules[input.name] = input.getAttribute("rules");
        }
        console.log(formRules);
    }
}
