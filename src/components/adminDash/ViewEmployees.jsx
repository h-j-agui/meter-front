import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "moment";
import {
  Container,
  Typography,
  Card,
  CardHeader,
  Box,
  Button,
  CardActions,
  IconButton,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import FormDialog from "./elements/FormEdit";
import { visuallyHidden } from "@mui/utils";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const history = useHistory();

  const getEmployees = () => {
    axios
      .get("http://localhost:8080/getUser")
      .then((data) => {
        setEmployees(data.data);
      })
      .then(() => {
        // console.log("employees state", employees);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8080/deleteUser/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const newEmployees = employees.filter((employee) => employee.id != id);
    setEmployees(newEmployees);
    console.log("handleDelete", id);
  };

  return (
    <>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          color="secondary"
          sx={{ m: "15px auto" }}
        >
          Your Employees
        </Typography>
        <IconButton sx={{ visuallyHidden }} href="/addUser">
          <Icon color="secondary">add_circle</Icon>
        </IconButton>

        {employees.map((employee) => {
          // console.log(employee);
          return (
            <Card key={employee.id} elevation={2}>
              <Box>
                <CardHeader title={employee.username} />
                <Typography>
                  {Moment(employee.createdAt).format("ll")}
                </Typography>
                <CardActions>
                  <Button
                    onClick={() => {
                      console.log("clicking");
                      handleDelete(employee.id);
                    }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    employee={employee}
                    getEmployees={getEmployees}
                  >
                    Edit Employee
                  </Button>
                </CardActions>
              </Box>
            </Card>
          );
        })}
        <Button
          color="secondary"
          variant="text"
          size="medium"
          sx={{ margin: "10px auto" }}
          onClick={() => {
            history.push("/admin/adminDash");
          }}
        >
          Back to Dashboard
        </Button>
      </Container>
    </>
  );
}
