import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataThunk, sendDataThunk } from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
import { dataSendingObj } from "../../Types";
import "./project.scss";

import plus from "../../assets/images/plus.svg";
import cross from "../../assets/images/cross.svg";
import loader from "../../assets/images/loader.svg";

import { Result } from "./Result";

export const Project = () => {
  const dispatch = useDispatch();

  const [numOfRows, setnumOfRows] = useState(3);
  const [rowValues, setrowValues] = useState<Array<dataSendingObj>>([]);
  const [isFirstSaveAttempt, setisFirstSaveAttempt] = useState(false);
  const numOfRowsArray = [...Array(numOfRows)];
    const resultedData = useSelector((state: RootState) => state.dataReducer.data);
    const fetchingList = useSelector((state: RootState) => state.dataReducer.fetchingList);

  const increaseNum = () => {
    setnumOfRows(numOfRows + 1);
  };
  const dicreaseNum = () => {
    setnumOfRows(numOfRows - 1);
    setrowValues((prev) => prev.slice(0, prev.length-1))
  };
  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    keyName: string
  ) => {
    let alreadyExistedObj = rowValues.find((elem) => elem.id === index + 1);
    if (alreadyExistedObj) {
      let rewrittenObj = {
        ...alreadyExistedObj,
        [keyName]:
          Date.now() > Date.parse(event.target.value) && Date.parse(event.target.value) >= Date.parse(alreadyExistedObj.registrationDate ?? '0')
            ? event.target.value
            : "error",
      };
      let newList = rowValues.map((i) =>
        i.id === rewrittenObj.id ? rewrittenObj : i
      );
      setrowValues(newList);
    } else {
      setrowValues((prev) => [
        ...prev,
        {
          [keyName]:
            Date.now() > Date.parse(event.target.value)
              ? event.target.value
              : "error",
          id: index + 1,
        },
      ]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendDataThunk(rowValues));
    setisFirstSaveAttempt(true);
  };
  const handleCalculateClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(getDataThunk());
  };
  return (
    <div className="project-wrapper">
      <form className="project"  onSubmit={handleSubmit}>
        <p className="project__title">Current</p>

        <div className="project__table">
          <table className="project__table-inner" cellPadding="10">
            <tbody>
              <tr>
                <th>UserID</th>
                <th>Date Registration</th>
                <th>Date Last Activity</th>
              </tr>
              {numOfRowsArray.map((_, index) => (
                <tr key={index}>
                  <td className="project__table-input">{index + 1}</td>
                  <td>
                    <input
                        className={`project__table-input ${
                          rowValues.find(
                            (elem) =>
                              elem.id === index + 1 &&
                              elem.registrationDate === "error"
                          )
                            ? "error"
                            : ""
                        } `}
                      onBlur={(event) => {
                        handleBlur(event, index, "registrationDate");
                      }}
                      type="date"
                      placeholder={index === 0 ? "__.__.____" : ""}
                    />
                  </td>
                  <td>
                    <input
                      className={`project__table-input ${
                        rowValues.find(
                          (elem) =>
                            elem.id === index + 1 &&
                            elem.activityDate === "error"
                        )
                          ? "error"
                          : ""
                      } `}
                      max="2021-08-24"
                      onBlur={(event) => {
                        handleBlur(event, index, "activityDate");
                      }}
                      placeholder={index === 0 ? "__.__.____" : ""}
                      type="date"
                    />
                  </td>
                      
                  {index === numOfRowsArray.length - 1 && (
                    <button
                      className="project__table-cross"
                      onClick={dicreaseNum}
                      disabled={numOfRows <= 1}
                      type="button"
                    >
                      <img src={cross} alt="cross!" />
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="project__controls-btn"
          onClick={increaseNum}
          disabled={numOfRows >= 6}
          type="button"
        >
          <img src={plus} alt="plus" /> add one more
        </button>
        <div className="project__contols">
          <div>
            <button
              type="submit"
              disabled={
                rowValues.find((i) => Object.keys(i).length === 3) ?  rowValues.find((i) => i.activityDate == 'error' || i.registrationDate === 'error')? true: false : true
              }
              className="project__controls-btn project__controls-btn-general"
            >
              {fetchingList.some(elem => elem === 'saving') ? <img src={loader} alt="loader" /> : 'Save table'}
            </button>
            <button
              className="project__controls-btn project__controls-btn-general"
              onClick={handleCalculateClick}
              disabled={!isFirstSaveAttempt || fetchingList.some(elem => elem === 'saving')}
            >
               {fetchingList.some(elem => elem === 'calculating') ? <img src={loader} alt="loader" /> : 'Calculate'}
            </button>
          </div>
        </div>
      </form>

      {resultedData && <Result resultedData={resultedData} />}
    </div>
  );
};

export default Project;
