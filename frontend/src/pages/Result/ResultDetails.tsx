import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { getResultDetails, reset } from "../../features/result/resultSlice";
import "./table.css";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Error, Loader } from "../../components";
import PrintIcon from "@mui/icons-material/Print";

const tableHead = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
  "Total",
];
/* const kDimension = ["Factual", "Conceptual", "Procedural", "Metacognitive"]; */

const ResultDetails = () => {
  //Router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { resultDet, isLoading, isError } = useAppSelector(
    (state: RootState) => state.result
  );

  //Crteate new result with index to get the number
  let newResult: { kd: string; cpd: string; index: number }[] = [];

  resultDet?.questions!.map((result, index) => {
    return newResult?.push({
      kd: result.kd,
      cpd: result.cpd,
      index: index + 1,
    });
  });

  // Filter knowledge dimension and congnitive proccess dimension
  const filterResult = (kDimension: string, cpDimension: string) => {
    return newResult
      .filter(
        (result) => result.kd === kDimension && result.cpd === cpDimension
      )
      .map((result) => result.index);
  };

  // kd --> factual conceptual procedural metacognitive
  // cpd --> remember understand apply analyze evaluate create

  //Factual
  const factualRemember = filterResult("Factual", "Remember");
  const factualUnderstand = filterResult("Factual", "Understand");
  const factualApply = filterResult("Factual", "Apply");
  const factualAnalyze = filterResult("Factual", "Analyze");
  const factualEvaluate = filterResult("Factual", "Evaluate");
  const factualCreate = filterResult("Factual", "Create");

  console.log(factualRemember);
  //Conceptual
  const conceptualRemember = filterResult("Conceptual", "Remember");
  const conceptualUnderstand = filterResult("Conceptual", "Understand");
  const conceptualApply = filterResult("Conceptual", "Apply");
  const conceptualAnalyze = filterResult("Conceptual", "Analyze");
  const conceptualEvaluate = filterResult("Conceptual", "Evaluate");
  const conceptualCreate = filterResult("Conceptual", "Create");
  //Procedural
  const proceduralRemember = filterResult("Procedural", "Remember");
  const proceduralUnderstand = filterResult("Procedural", "Understand");
  const proceduralApply = filterResult("Procedural", "Apply");
  const proceduralAnalyze = filterResult("Procedural", "Analyze");
  const proceduralEvaluate = filterResult("Procedural", "Evaluate");
  const proceduralCreate = filterResult("Procedural", "Create");
  //Metacognitive
  const metacognitiveRemember = filterResult("Metacognitive", "Remember");
  const metacognitiveUnderstand = filterResult("Metacognitive", "Understand");
  const metacognitiveApply = filterResult("Metacognitive", "Apply");
  const metacognitiveAnalyze = filterResult("Metacognitive", "Analyze");
  const metacognitiveEvaluate = filterResult("Metacognitive", "Evalue");
  const metacognitiveCreate = filterResult("Metacognitive", "Create");

  //Factual total
  const factualTotal = [
    ...factualRemember,
    ...factualUnderstand,
    ...factualApply,
    ...factualAnalyze,
    ...factualEvaluate,
    ...factualCreate,
  ].length;

  //Conceptual total
  const conceptualTotal = [
    ...conceptualRemember,
    ...conceptualUnderstand,
    ...conceptualApply,
    ...conceptualAnalyze,
    ...conceptualEvaluate,
    ...conceptualCreate,
  ].length;

  //Procedural total
  const proceduralTotal = [
    ...proceduralRemember,
    ...proceduralUnderstand,
    ...proceduralApply,
    ...proceduralAnalyze,
    ...proceduralEvaluate,
    ...proceduralCreate,
  ].length;

  //Metacognitive
  const metacognitiveTotal = [
    ...metacognitiveRemember,
    ...metacognitiveUnderstand,
    ...metacognitiveApply,
    ...metacognitiveAnalyze,
    ...metacognitiveEvaluate,
    ...metacognitiveCreate,
  ].length;

  //Cognitive Process Dimension total
  const rememberTotal = [
    ...factualRemember,
    ...conceptualRemember,
    ...proceduralRemember,
    ...metacognitiveRemember,
  ].length;

  const understandTotal = [
    ...factualUnderstand,
    ...conceptualUnderstand,
    ...proceduralUnderstand,
    ...metacognitiveUnderstand,
  ].length;

  const applyTotal = [
    ...factualApply,
    ...conceptualApply,
    ...proceduralApply,
    ...metacognitiveApply,
  ].length;

  const analyzeTotal = [
    ...factualAnalyze,
    ...conceptualAnalyze,
    ...proceduralAnalyze,
    ...metacognitiveAnalyze,
  ].length;

  const evaluateTotal = [
    ...factualEvaluate,
    ...conceptualEvaluate,
    ...proceduralEvaluate,
    ...metacognitiveEvaluate,
  ].length;

  const createTotal = [
    ...factualCreate,
    ...conceptualCreate,
    ...proceduralCreate,
    ...metacognitiveCreate,
  ].length;

  //Total

  const total =
    factualTotal +
    conceptualTotal +
    proceduralTotal +
    metacognitiveTotal +
    rememberTotal +
    understandTotal +
    applyTotal +
    analyzeTotal +
    evaluateTotal +
    createTotal;

  useEffect(() => {
    dispatch(getResultDetails(id!));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (resultDet) {
      window.print();

      navigate("/results");
    }
  }, [resultDet, navigate]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <Box className="tos" sx={{ display: "none", displayPrint: "block" }}>
      <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">
        Two Dimensional Table of Specifications
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <div>
          <table>
            <tr>
              <td></td>
              {tableHead.map((cpd) => (
                <td>
                  <Typography fontWeight="bold">{cpd}</Typography>
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <Typography fontWeight="bold">Factual</Typography>
              </td>
              <td>{factualRemember.join(",")}</td>
              <td>{factualUnderstand.join(",")} </td>
              <td>{factualApply.join(",")}</td>
              <td>{factualAnalyze.join(",")}</td>
              <td>{factualEvaluate.join(",")}</td>
              <td>{factualCreate.join(",")}</td>
              <td>{factualTotal}</td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight="bold">Conceptual</Typography>
              </td>
              <td>{conceptualRemember.join(",")}</td>
              <td>{conceptualUnderstand.join(",")} </td>
              <td>{conceptualApply.join(",")}</td>
              <td>{conceptualAnalyze.join(",")}</td>
              <td>{conceptualEvaluate.join(",")}</td>
              <td>{conceptualCreate.join(",")}</td>
              <td>{conceptualTotal}</td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight="bold">Procedural</Typography>
              </td>
              <td>{proceduralRemember.join(",")}</td>
              <td>{proceduralUnderstand.join(",")} </td>
              <td>{proceduralApply.join(",")}</td>
              <td>{proceduralAnalyze.join(",")}</td>
              <td>{proceduralEvaluate.join(",")}</td>
              <td>{proceduralCreate.join(",")}</td>
              <td>{proceduralTotal}</td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight="bold">Metacognitive</Typography>
              </td>
              <td>{metacognitiveRemember.join(",")}</td>
              <td>{metacognitiveUnderstand.join(",")} </td>
              <td>{metacognitiveApply.join(",")}</td>
              <td>{metacognitiveAnalyze.join(",")}</td>
              <td>{metacognitiveEvaluate.join(",")}</td>
              <td>{metacognitiveCreate.join(",")}</td>
              <td>{metacognitiveTotal}</td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight="bold">Total</Typography>
              </td>
              <td>{rememberTotal}</td>
              <td>{understandTotal} </td>
              <td>{applyTotal}</td>
              <td>{analyzeTotal}</td>
              <td>{evaluateTotal}</td>
              <td>{createTotal}</td>
              <td>{total}</td>
            </tr>
          </table>
          <Button sx={{ displayPrint: "none" }} onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ResultDetails;
