import React, { FocusEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataThunk, sendDataThunk } from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
import { dataSendingObj } from "../../Types";
import "./project.scss";
import { Result } from "./Result";

export const Project = () => {
  const dispatch = useDispatch();

  const [numOfRows, setnumOfRows] = useState(3);
  const [rowValues, setrowValues] = useState<Array<dataSendingObj>>([]);
  const [isFirstSaveAttempt, setisFirstSaveAttempt] = useState(false);

  const resultedData = useSelector(
    (state: RootState) => state.dataReducer.data
  );

  const increaseNum = () => {
    setnumOfRows(numOfRows + 1);
  };
  const dicreaseNum = () => {
    setnumOfRows(numOfRows - 1);
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
        [keyName]: event.target.value,
      };
      let newList = rowValues.map((i) =>
        i.id === rewrittenObj.id ? rewrittenObj : i
      );
      setrowValues(newList);
    } else {
      setrowValues((prev) => [
        ...prev,
        { [keyName]: event.target.value, id: index + 1 },
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
      <form className="project" onSubmit={handleSubmit}>
        <p className="project__title">Current</p>

        <div className="project__table">
          <table className="project__table-inner" cellPadding="10">
            <tbody>
              <tr>
                <th>№</th>
                <th>Date Registration</th>
                <th>Date Last Activity</th>
              </tr>
              {[...Array(numOfRows)].map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      onBlur={(event) => {
                        handleBlur(event, index, "registrationDate");
                      }}
                      type="date"
                      placeholder={index === 0 ? "__.__.____" : ""}
                    />
                  </td>
                  <td>
                    <input
                      max="17-08-2021"
                      onBlur={(event) => {
                        handleBlur(event, index, "activityDate");
                      }}
                      placeholder={index === 0 ? "__.__.____" : ""}
                      type="date"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="project__contols">
          <button
            className="project__controls-btn"
            onClick={increaseNum}
            disabled={numOfRows >= 6}
            type="button"
          >
            add row
          </button>
          <button
            className="project__controls-btn"
            onClick={dicreaseNum}
            disabled={numOfRows <= 1}
            type="button"
          >
            delete row
          </button>
          <div>
            <button
              type="submit"
              disabled={
                rowValues.find((i) => Object.keys(i).length == 3) ? false : true
              }
              className="project__controls-btn project__controls-btn-general"
            >
              Save table
            </button>
            <button
              className="project__controls-btn project__controls-btn-general"
              onClick={handleCalculateClick}
              disabled={!isFirstSaveAttempt}
            >
              Calculate
            </button>
          </div>
        </div>
      </form>
      {resultedData && <Result resultedData={resultedData} />}
    </div>
  );
};

export default Project;
