
//import React, {Fragment, useState, useEffect } from 'react';
import React, { useEffect } from 'react';
//import {projectAPI} from './projectAPI';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
//import { Project } from './Project';
import { addAbortSignal } from 'stream';
import { useSelector, useDispatch} from 'react-redux';
import {AppState } from '../state';
import { loadProjects } from './state/projectActions';
import { AnyAction } from 'redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';



function ProjectsPage() {
/*
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
*/

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, Action>>();
    const loading = useSelector(
      (appState: AppState) => appState.projectState.loading
    );
    const projects = useSelector(
      (appState: AppState) => appState.projectState.projects
    ); 

    const error = useSelector(
      (appState: AppState) => appState.projectState.error
    ); 

    const currentPage = useSelector(
      (appState: AppState) => appState.projectState.page
    ); 

    //const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();
   
    useEffect(() => {
      dispatch(loadProjects(1));
    }, [dispatch]);


    const handleMoreClick = () => {
     // setCurrentPage((currentPage) => currentPage + 1);
        dispatch(loadProjects(currentPage + 1));
    };

// Approach 1: using promise then
//  useEffect(() => {
//    setLoading(true);
//    projectAPI
//      .get(1)
//      .then((data) => {
//        setError(null);
//        setLoading(false);
//        setProjects(data);
//      })
//      .catch((e) => {
//        setLoading(false);
//        setError(e.message);
//        if (e instanceof Error) {
//           setError(e.message);
//        }
//      });
//  }, []);
//

// Using async and await-------------
/*
  useEffect(() => {
        async function loadProjects() {
          setLoading(true);
          try {
            const data = await projectAPI.get(currentPage);
           // setError('');

          if (currentPage === 1){
            setProjects(data);
          } else{
            setProjects((project) => [...projects, ...data]);
          }

          }
           catch (e) {
           if (e instanceof Error) {
             setError(e.message);
            }
            } finally {
           setLoading(false);
        }
        }
        loadProjects();
  }, [currentPage]);
*/


    return (
        <Fragment>
        <h1> Projects</h1>

       {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

       <ProjectList projects={projects} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

        {loading && (
            <div className="center-page">
                <span className="spinner primary"> </span>
                <p>Loading...</p>
            </div>
        )}
        </Fragment>
    );
}


export default ProjectsPage;