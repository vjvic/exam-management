import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getExamDetails } from "../../features/exam/examSlice";
import { Error, Loader } from "../../components";

const ExamDetails = () => {
  const { id } = useParams();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );

  useEffect(() => {
    dispatch(getExamDetails(id!));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return <div>ExamDetails {id}</div>;
};

export default ExamDetails;
