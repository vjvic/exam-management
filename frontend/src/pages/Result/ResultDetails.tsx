import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { getResultDetails, reset } from "../../features/result/resultSlice";

const ResultDetails = () => {
  //Router hooks
  const { id } = useParams();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { resultDet } = useAppSelector((state: RootState) => state.result);

  //Crteate new result with index to get the number
  let newResult: { kd: string; cpd: string; index: number }[] = [];

  resultDet?.questions!.map((result, index) => {
    return newResult?.push({
      kd: result.kd,
      cpd: result.cpd,
      index: index + 1,
    });
  });

  const factualRemember = newResult.filter(
    (result) => result.kd === "Factual" && result.cpd === "Remember"
  );

  const factualUnderstand = newResult.filter(
    (result) => result.kd === "Factual" && result.cpd === "Understand"
  );

  console.log(factualRemember, factualUnderstand);

  useEffect(() => {
    dispatch(getResultDetails(id!));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  return <div>ResultDetails {id}</div>;
};

export default ResultDetails;
