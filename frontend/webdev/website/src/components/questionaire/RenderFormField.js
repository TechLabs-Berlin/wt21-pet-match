import React from "react";

const RenderFormField = (props) => {
    let answerValue = 0;
    let actualIndex = props.index + 1;
    let optionTxt = 'option_' + actualIndex;
    let fieldChanged = props.fieldChanged;
    let actualValue = props.actValue;

    if (props.answer.answerValue) {
        answerValue = props.answer.answerValue;
    }

    /* 
    console.log("=========================================");
    console.log("... begin: RenderFormField ...");
    console.log("actualValue: "+actualValue);
    console.log(optionTxt);
    console.log("answerValue: " + answerValue);
    console.log("props.answer.answerValue: "+props.answer.answerValue);
    console.log("... end: RenderFormField ...");
    console.log("=========================================");
    */

    if (props.qType === 1) {
        if (actualValue) {
            answerValue = actualValue;
        }
        return (
            <div key={actualIndex} className="questionnaire_input">
                <label className="container__input" htmlFor="input_field">
                    <span>{props.answer.answerText}</span>
                    <input 
                        required min="0" max="120"
                        type="number"
                        id="input_field"
                        name="input_field"
                        value={answerValue}
                        onChange={e => fieldChanged(e.target.value)}
                    />
                </label>
            </div>
        )
    }
    else {
        if (parseInt(answerValue) === parseInt(actualValue)) {
            return (
                <div key={actualIndex} className="questionnaire_option">
                    <label className="container__radio_button" htmlFor={optionTxt}>
                        <span>{props.answer.answerText}</span>
                        <input
                            required
                            checked
                            type="radio"
                            id={optionTxt}
                            name="options"
                            value={answerValue}
                            onChange={e => fieldChanged(e.target.value)}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            )
        }
        else {
            return (
                <div key={actualIndex} className="questionnaire_option">
                    <label className="container__radio_button" htmlFor={optionTxt}>
                        <span>{props.answer.answerText}</span>
                        <input
                            required
                            type="radio"
                            id={optionTxt}
                            name="options"
                            value={answerValue}
                            onChange={e => fieldChanged(e.target.value)}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            );
        }
    }
};

export default RenderFormField;