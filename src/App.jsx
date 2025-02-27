import {
  Checkbox,
  createTheme,
  List,
  ListItem,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/joy/Grid";
import "./App.css";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import iconBee from "./assets/6200_8_06-Photoroom.png";
function App() {
  const [userValue, setUserValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingElement, setEditingElement] = useState(null);
  const [editValue, setEditValue] = useState("");

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#d2b48c", 
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color: "#d2b48c", // Colore del testo quando la TextField è attiva
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#d2b48c", // Sottolineatura verde quando attiva
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#d2b48c", // Bordo verde quando attiva
              },
            },
          },
        },
      },
    },
  });

  const addNewRow = (e) => {
    e.preventDefault();
    if (userValue.trim() === "") return;

    setTasks((prevTasks) => [...prevTasks, userValue]);
    setUserValue("");
  };

  const reset = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
    setUserValue("");
  };

  const handleDeleteElement = (indexToRemove) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim() === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? editValue : task))
    );
    setEditingElement(null);
  };

  const handleEdit = (index) => {
    setEditingElement(index);
    setEditValue(tasks[index]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            textAlign: "center",
            minHeight: "100vh",
          }}
          flexDirection={"column"}
        >
          <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
            <img src={iconBee} className="iconBee"></img>
          </Grid>
          <Grid
          size={{ xs: 12, sm: 12, md: 12 }}
            minWidth="400px"
            maxWidth="400px"
            sx={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <form onSubmit={addNewRow}>
              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  background: "#d2b48c",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="h4" component="h1">
                  To-Do Beest
                </Typography>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <TextField
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  label="Inserisci qualcosa da fare"
                  sx={{
                    minWidth: "360px",
                    maxWidth: "400px",
                    marginTop: "20px",
                  }}
                  variant="standard"
                />
              </Grid>
            </form>
            {tasks.length > 0 && (
              <Grid
                xs={12}
                sm={8}
                md={6}
                style={{ marginTop: "20px" }}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                width={"100%"}
                sx={{ backgroundColor: "" }}
              >
                <List sx={{ textAlign: "center", alignItems: "center" }}>
                  <Typography>Cose da fare:</Typography>
                  {tasks.map((task, index) => (
                    <ListItem key={index} sx={{ justifyContent: "center" }}>
                      <Checkbox></Checkbox>
                      {editingElement === index ? (
                        // Input modificabile se l'elemento è in editing
                        <TextField
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          fullWidth
                        />
                      ) : (
                        // Testo normale se l'elemento non è in editing
                        <ListItemText
                          primary={task}
                          sx={{
                            textAlign: "left",
                            wordBreak: "break-word",
                            width: "100%",
                          }}
                        />
                      )}
                      {editingElement === index ? (
                        <SaveIcon
                          variant="contained"
                          onClick={() => handleSaveEdit(index)}
                          color="success"
                          sx={{ marginLeft: "10px" }}
                          className="icons"
                        >
                          Salva
                        </SaveIcon>
                      ) : (
                        <EditIcon
                          variant="contained"
                          onClick={() => handleEdit(index)}
                          sx={{ marginLeft: "10px" }}
                          className="icons"
                        ></EditIcon>
                      )}

                      <DeleteForeverIcon
                        variant="contained"
                        onClick={() => handleDeleteElement(index)}
                        color="error"
                        sx={{ marginLeft: "10px" }}
                        className="icons"
                      ></DeleteForeverIcon>
                    </ListItem>
                  ))}
                  {/* <RestartAltIcon
                    onClick={reset}
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                    color="error"
                    className="icons"
                  >
                    Reset
                  </RestartAltIcon> */}
                </List>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
