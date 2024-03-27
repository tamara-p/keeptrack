import React, {SyntheticEvent, useState} from "react";
import {Project} from './Project';
import { useDispatch } from 'react-redux';
import { saveProject } from './state/projectActions';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { Action } from 'redux';

interface ProjectFormProps {
    project: Project;
   // onSave: (project: Project) => void;
    onCancel: () => void;
    
}

function ProjectForm({
    project: initialProject,
  //  onSave,
    onCancel,
    }: ProjectFormProps){

    const [project, setProject] = useState(initialProject);
        //changing project info
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget:'',
        // setting errors when there is an issue
    });

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, Action>>();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
       // onSave(project);
        //save info
        dispatch(saveProject(project));
    };

    const handleChange = (event: any) => {
        const {type, name, value, checked} = event.target;
        let updatedValue = type === 'checkbox' ? checked: value;
         // check if box checked, otherwise it's a value

        // if number convert updatedValue string to positive number
        if (type ==='number'){
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        setProject((p) =>{
            updatedProject = new Project({ ...p, ...change});
            return updatedProject;
        });
        setErrors(() => validate(updatedProject)); // Check project
    };

    function validate(project: Project){ // make errors if fields are empty or too long
        let errors: any = {name: '', description: '', budget: ''};
        if (project.name.length ===0){
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3){
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if(project.name.length > 30){
            errors.name = 'Name cannot be longer than 30 characters.';
        }
        if(project.description.length ===0){
            errors.description ='Description cannot be empty';
        }
        if(project.budget === 0 ){
            errors.budget = 'Budget must be greater than $0.';
        }
        return errors;
    }

    function isValid() {
        return(
            errors.name.length === 0 && 
            errors.description.length ===0 &&
            errors.budget.length === 0
        );
    }


    return (
        <form className="input-group vertical"  onSubmit ={handleSubmit}>
           
            <label htmlFor="name"> Project Name</label>
            <input
             type ="text"
             name="name"
             placeholder = "enter name"
             value = {project.name}
             onChange = {handleChange}
             />
             {errors.name.length > 0 && (
                <div className="card error">
                    <p> {errors.name}</p>
                </div>
             )}
            <label htmlFor="description">Project Description</label>
            <textarea 
            name="description" placeholder="enter description"
            value = {project.description} 
            onChange = {handleChange}/>
            {errors.description.length > 0 && (
                <div className="card error">
                    <p> {errors.description}</p>
                </div>
             )}
            <label htmlFor="budget"> Project Budget</label>
            <input
                 type="number" name="budget" placeholder ="enter budget"
                 value={project.budget}
                 onChange = {handleChange} />
                {errors.budget.length > 0 && (
                <div className="card error">
                    <p> {errors.budget}</p>
                </div>
             )}

            <label htmlFor="isActive"> Active?</label>
            <input
                 type="checkbox" name="isActive"
                 checked={project.isActive}
                 onChange={handleChange}/>
            <div className="input-group">
                <button className="primary bordered medium"> Save</button>
                <span/>
                <button type="button" className="tertiary bordered medium"
                onClick = {onCancel}
                >
                    cancel
                </button>
            </div>
        </form>
    );
}
export default ProjectForm;