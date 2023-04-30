import React, { useState, useContext } from "react";
import { theme } from "../../themes/theme";
import {
  Box,
  ThemeProvider,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserContext from "../../context/userContext";
import TopicButtons from "./TopicButtons";
import SubtopicButtons from "./SubtopicButtons";
import AddNewTopic from "./AddNewTopic";

function ViewPlanContent({ planData }) {
  const [contentData, setContentData] = useState(planData.topics);
  const { userInfoContext } = useContext(UserContext);
  console.log(userInfoContext.userid, planData.userid);
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" gap={theme.spacing(2)}>
        {contentData.length ? (
          <>
            {contentData.map((topic, index) => (
              <Accordion key={index} elevation={4}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontSize="1.5rem" fontWeight="500">
                    {topic.topic_title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontSize="1.3rem">{topic?.content}</Typography>
                  {topic?.subtopics && (
                    <Box py={theme.spacing(2)} px={theme.spacing(1)}>
                      {topic.subtopics.map((subtopic, index) => (
                        <Accordion key={index} elevation={4}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontSize="1.3rem" fontWeight="500">
                              {subtopic?.subtopic_title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography fontSize="1.2rem">
                              {subtopic?.content}
                            </Typography>
                          </AccordionDetails>
                          {userInfoContext?.userid === planData?.userid ? (
                            <AccordionActions>
                              <SubtopicButtons index={index} info={subtopic} />
                            </AccordionActions>
                          ) : null}
                        </Accordion>
                      ))}
                    </Box>
                  )}
                </AccordionDetails>
                {userInfoContext?.userid === planData?.userid ? (
                  <AccordionActions>
                    <TopicButtons index={index} info={topic} />
                  </AccordionActions>
                ) : null}
              </Accordion>
            ))}
          </>
        ) : (
          <Box>
            <Typography>Uh oh! This plan doesn't have any content!</Typography>
          </Box>
        )}
        {userInfoContext?.userid === planData?.userid ? (
          <AddNewTopic info={contentData[0]} />
        ) : null}
      </Stack>
    </ThemeProvider>
  );
}

export default ViewPlanContent;
