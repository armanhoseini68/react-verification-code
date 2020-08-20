import styles from "./index.module.css";
import { useState, useRef, useEffect } from "react";

const VerificationCode = ({ onVerificationCodeEntered }) => {
  let inputsContainer = useRef(null);
  const validKeys = [
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    8,
    46,
  ];
  const inputs = [
    {
      order: 1,
      name: "one",
    },
    {
      order: 2,
      name: "two",
    },
    {
      order: 3,
      name: "three",
    },
    {
      order: 4,
      name: "four",
    },
    {
      order: 5,
      name: "five",
    },
  ];
  const [fCodes, setFCodes] = useState({
    one: "-1",
    two: "-1",
    three: "-1",
    four: "-1",
    five: "-1",
  });

  useEffect(() => {
    handleCodeChange();
  }, [fCodes]);

  const onInputKeyDown = (e, senderCode) => {
    if (!validKeys.includes(e.keyCode)) {
      e.preventDefault();
      return;
    }
    let hasValue = !!e.target.value;
    if (e.keyCode && e.keyCode === 8 && !hasValue) {
      handleMovement(senderCode, hasValue);
    }
  };

  const onInputKeyUp = (e, senderCode) => {
    e.target.setAttribute("data-value", e.target.value);
    let hasValue = !!e.target.value;

    if (e.keyCode && e.keyCode != 8 && hasValue) {
      handleMovement(senderCode, hasValue);
    }
  };

  const handleMovement = (senderCode, hasValue) => {
    if (hasValue && senderCode < 5) {
      inputsContainer.current.children[senderCode].children[0].select();
      return;
    }
    if (!hasValue && senderCode > 1) {
      inputsContainer.current.children[senderCode - 2].children[0].select();
      return;
    }
  };
  const handleCodeChange = () => {
    let mainCode = "";
    for (let i in fCodes) {
      if (fCodes[i] === "-1") {
        break;
      }
      mainCode += fCodes[i];
    }
    if (
      mainCode.length === 5 &&
      onVerificationCodeEntered &&
      typeof setVerificationCode
    ) {
      if (/^[0-9]{5}$/.test(mainCode)) {
        onVerificationCodeEntered(mainCode);
        return;
      }
    }
    onVerificationCodeEntered(null);
  };
  const handleInputChange = (e, sender) => {
    const tempCodes = {
      ...fCodes,
    };
    tempCodes[sender] = e.target.value ? e.target.value : "-1";
    setFCodes(tempCodes);
  };
  return (
    <div className={styles.verificationCode}>
      <ul
        className={styles.codeItems}
        id="legaMartVerificatioCode"
        ref={inputsContainer}
      >
        {inputs.map((input) => (
          <li key={input.order}>
            <input
              type="text"
              data-value=""
              maxLength="1"
              onKeyDown={(e) => onInputKeyDown(e, input.order)}
              onKeyUp={(e) => onInputKeyUp(e, input.order)}
              onChange={(e) => handleInputChange(e, input.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerificationCode;
