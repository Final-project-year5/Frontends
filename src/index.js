import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import StudentLayout from 'layouts/student';
import AdminLayout from 'layouts/admin';
import TeacherLayout from 'layouts/teacher';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

import RouteGuard from './RouteGuard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewCoursePage from "./views/teacher/courses/components/view";
import {tableData} from "views/teacher/courses/variables/tableData";
import {studentData} from "views/teacher/courses/variables/studentData";
import AttendanceHistory from "./views/teacher/Attendance Report/AttendanceHistory";
import DetailedReport from "./views/teacher/Attendance Report/DetailReport";
import StudentPermission from "./views/teacher/StudentPemission/StudentPermission";
import AddSchedule from "./views/teacher/Schedule/AddSchedule";
import EditSchedule from "./views/teacher/Schedule/EditSchedule";
import ViewSchedule from "./views/teacher/Schedule/ViewSchedule";
import ViewPermission from "./views/teacher/StudentPemission/ViewPermission";
import CourseManagement from './views/admin/AdminHR/CourseManagement';
import LandingPage from "./views/LandingPage/LandingPage";
import Register from "./views/auth/signIn/index";
import Login from "./views/auth/signIn/LoginForm";
import ForgotPwd from "./views/auth/signIn/ForgotPasswordProcess";
import ProfilePage from './views/student/profile/index';
import TeacherCourseSelection from "./views/teacher/courses/components/TeacherCourseSelection";
import Demopages from "./views/student/course/demo"
import Calendar from 'react-calendar';
import StudentPerformanceForm from './views/teacher/StudentPerformance/addPerformanceForm';


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
      <ToastContainer  position="top-center"
 />
        <HashRouter>
          <Switch>

            <Route exact path="/" component={LandingPage} />
            <Route path={`/student`} component={StudentLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/teacher`} component={TeacherLayout} />
            <RouteGuard path="/courses/:index" component={(props) => <ViewCoursePage {...props} tableData={tableData} students={studentData} />} allowedRoles={["teacher"]} />
            <RouteGuard path="/attendance-history" component={AttendanceHistory} allowedRoles={["teacher"]} />
            <RouteGuard path="/detailed-report/:id" component={DetailedReport} allowedRoles={["teacher"]} />
            <RouteGuard path="/student-permission" component={StudentPermission} allowedRoles={["student"]} />
            <RouteGuard path="/student-demo" component={Demopages} allowedRoles={["student"]} />
            <RouteGuard path="/view-permission/:permissionId" component={ViewPermission} allowedRoles={["teacher"]} />
            <RouteGuard path="/course-management" component={CourseManagement} allowedRoles={["admin"]} />
            <RouteGuard path="/view-schedule" component={ViewSchedule} allowedRoles={["teacher"]} />
            <RouteGuard path="/add-schedule" component={AddSchedule} allowedRoles={["teacher"]} />
            <RouteGuard path="/edit-schedule/:id" component={EditSchedule} allowedRoles={["teacher"]} />
            <RouteGuard path="/profile-settings" component={() => (<AdminLayout><ProfilePage/></AdminLayout>
            )} allowedRoles={["teacher", "student", "admin"]} />
            <Route path="/signup" component={Register} />



            <Route path="/signin" component={Login} />
            <Route path="/forgotpwd" component={ForgotPwd} />
            <Route path="/studentperformance" component={StudentPerformanceForm} />
            <RouteGuard path="/teacher-course-selection" component={TeacherCourseSelection} allowedRoles={["teacher"]} />
            <Redirect from='/' to='/admin' />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
