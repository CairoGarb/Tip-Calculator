import { useState } from 'react'
import './Calculator.css'

export function Calculator() {

    // Use states
    const [priceInput, setPriceInput] = useState('')
    const [priceError, setPriceError] = useState('')

    const [peopleInput, setPeopleInput] = useState('')
    const [peopleError, setPeopleError] = useState('')

    const [selectedTip, setSelectedTip] = useState('');

    const [tipPerson, setTipPerson] = useState(0);
    const [totalPerson, setTotalPerson] = useState(0)

    const [isValidInput, setIsValidInput] = useState(false);

    const [customInput, setCustomInput] = useState('');

    // Function that validate the inputs
    const validateInputs = () => {
        let isValid = true;

        const priceNumber = parseFloat(priceInput)
        if (isNaN(priceNumber) || priceNumber <= 0) {
            setPriceError('Invalid price');
            isValid = false;
        } else {
            setPriceError('');
        }


        const peopleNumber = parseInt(peopleInput)
        if (isNaN(peopleNumber) || peopleNumber <= 0) {
            setPeopleError('Invalid number of people');
            isValid = false;
        } else {
            setPeopleError('');
        }

        setIsValidInput(isValid)

        // Calculation
        if (isValid && selectedTip !== null) {
            /* tip */
            const tipPercentage = parseFloat(selectedTip.replace('%', '')) / 100;
            const tipAmount = priceNumber * tipPercentage;

            /* tip per person */
            const tipPerPerson = tipAmount / peopleNumber;
            setTipPerson(parseFloat(tipPerPerson.toFixed(2)));

            /* Total per person */
            const totalPerPerson = priceNumber / peopleNumber;
            setTotalPerson(parseFloat(totalPerPerson.toFixed(2)));
        }

    }

    // Percentage choice
    const handleTipPercentage = (percentage: any) => {
        setSelectedTip(percentage);
        setCustomInput(percentage);
        validateInputs();
    }

    // The error will only appear when the input is not on focus or is submitted
    const handlePriceBlur = () => {
        const priceNumber = parseFloat(priceInput);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            setPriceError('Invalid price');
        } else {
            setPriceError('');
        }
    };

    const handlePeopleBlur = () => {
        const peopleNumber = parseInt(peopleInput);
        if (isNaN(peopleNumber) || peopleNumber <= 0) {
            setPeopleError('Invalid number of people');
        } else {
            setPeopleError('');
        }
    };

    // Reset the values
    const handleReset = () => {
        setPriceInput('');
        setPriceError('');
        setPeopleInput('');
        setPeopleError('');
        setSelectedTip('');
        setTipPerson(0);
        setTotalPerson(0);

        if (customInput) {
            setCustomInput('');
        }
    }

    return (
        <div className="calculatorContainer">

            <div className="bill">

                <div className="billCalculation">
                    <div className="billAmount">

                        <div className="flexRow">
                            <p>Bill</p>
                            <div className="errorMsg">{priceError}</div>
                        </div>

                        <div className="billAmountInput">
                            <label htmlFor="price">
                                <span className='dollarIcon'>
                                    <img src='./icon-dollar.svg' alt='dollar icon' />
                                </span>
                                <input id='price' type="text" placeholder='0'
                                    value={priceInput}
                                    onChange={(e) => {
                                        setPriceInput(e.target.value)
                                        if (e.target.value !== '') {
                                            validateInputs();
                                        }
                                    }}
                                    onBlur={handlePriceBlur}
                                    className={priceError ? 'error' : ''}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            validateInputs();
                                        }
                                    }}
                                />
                            </label>
                        </div>

                    </div>

                    <div className="tipSelector">

                        <p>Select Tip %</p>

                        <div className="tipAmount">
                            <p className="tipPercentage" onClick={() => {
                                handleTipPercentage('5%')
                            }}>5%</p>
                            <p className="tipPercentage" onClick={() => {
                                handleTipPercentage('10%')
                            }}>10%</p>
                            <p className="tipPercentage" onClick={() => {
                                handleTipPercentage('15%')
                            }}>15%</p>
                            <p className="tipPercentage" onClick={() => {
                                handleTipPercentage('25%')
                            }}>25%</p>
                            <p className="tipPercentage" onClick={() => {
                                handleTipPercentage('50%')
                            }}>50%</p>

                            <label htmlFor="custom">
                                <input id='custom' type="text" placeholder='Custom'
                                    value={customInput}
                                    onChange={(e) => {
                                        setSelectedTip(e.target.value)
                                        setCustomInput(e.target.value)
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            handleTipPercentage(selectedTip)
                                        }
                                    }} />
                            </label>

                        </div>

                    </div>

                    <div className="peopleAmount">

                        <div className="flexRow">
                            <p>Number of People</p>
                            <div className="errorMsg">{peopleError}</div>
                        </div>

                        <div className="peopleAmountInput">
                            <label htmlFor="people">
                                <span className='personIcon'>
                                    <img src='./icon-person.svg' alt='person icon' />
                                </span>
                                <input id='people' type="text" placeholder='0'
                                    value={peopleInput}
                                    onChange={(e) => {
                                        setPeopleInput(e.target.value)
                                        validateInputs();
                                    }}
                                    onBlur={handlePeopleBlur}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            validateInputs();
                                        }
                                    }}
                                    className={peopleError ? 'error' : ''}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="tipResult">

                    <div className="valueBill">
                        <div className="tipPerson">

                            <div className="flexColumn">
                                <p>Tip Amount</p>
                                <span>/ person</span>
                            </div>
                            <div className="resultPersonTip">{tipPerson}</div>

                        </div>

                        <div className="totalPerson">
                            <div className="flexColumn">
                                <p>Total</p>
                                <span>/ person</span>
                            </div>
                            <div className="resultTotal">{totalPerson}</div>
                        </div>
                    </div>

                    <button className={isValidInput && tipPerson > 0 ? 'submit' : 'disabled'}
                        onClick={() => {
                            if (document.querySelector('button.submit')) {
                                handleReset();
                            }
                        }}
                    >Reset</button>
                </div>

            </div>

        </div>
    )
}