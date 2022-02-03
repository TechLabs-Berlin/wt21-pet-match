import React from "react";

const RenderFormField = (props) => {
    let answerValue = 0;
    let actualIndex = props.index + 1;
    let optionTxt = 'option_' + actualIndex;
    let fieldChanged = props.fieldChanged;
    let actualValue = props.actValue;
    let answerTxt = "";

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
        if (props.answer.answerText.indexOf('/') !== -1) {
            answerTxt = props.answer.answerText.split('/');
        }
        if (actualValue) {
            answerValue = actualValue;
        } 
        else {
            answerValue = parseInt(answerTxt[2]);
        }
        return (
            <div key={actualIndex} className="questionnaire_option">
                <label htmlFor="input_field">
                    {answerTxt[0]}
                    <input 
                        required min={parseInt(answerTxt[2])} max={parseInt(answerTxt[3])}
                        type="number"
                        id="input_field"
                        name="input_field"
                        value={answerValue}
                        onInput={e => fieldChanged(e.target.value)}
                    />
                    {answerTxt[1]}
                </label>
            </div>
        )
    }
    else {
        if (parseInt(answerValue) === parseInt(actualValue)) {
            return (
                <div key={actualIndex} className="questionnaire_option">
                    <label className="container__radio_button" htmlFor={optionTxt}>
                        {props.answer.answerText}
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
                        {props.answer.answerText}
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