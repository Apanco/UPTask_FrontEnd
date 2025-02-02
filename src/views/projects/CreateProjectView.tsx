import {  useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
//# ->  Importacion de types
import type { ProjectFormData } from "@/types/index"

//# ->  Funciones
import { createProject } from "@/api/ProjectApi"

//# ->  Componentes
import { C_Boton } from "@/components/C_Boton"
import ProjectForm from "@/components/projects/ProjectForm"
import { Card } from "@/components/ui/card";
import C_Encabezado from "@/components/C_Encabezado";
import C_BotonVolverProyectos from "@/components/C_BotonVolverProyectos";
export default function CreateProjectView() {
    
    const [isLoad, setisLoad] = useState<boolean>(false)
    const mutation = useMutation({
        mutationFn: createProject,
        onError:(error)=>{
            toast.error(error.message)
            setisLoad(false)  
        },
        onSuccess:(data)=>{
            toast.success("Proyecto creado correctamente")
            navigate("/")
            setisLoad(false)
            console.log(data)
        }
    });


    const navigate= useNavigate()
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName:"",
        description:""
    }

    const { register, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})

    const handleForm = async (formData : ProjectFormData)=>{
        setisLoad(true)
        await mutation.mutateAsync(formData); 
        
    }
    return (
        <>  
            <C_Encabezado
                title="Crear proyecto"
                description="Llena el formulario para crear un proyecto"
            >
                <C_BotonVolverProyectos/>
            </C_Encabezado>
            
            <div className=" max-w-3xl mx-auto mt-5">

                <Card className=" px-5 py-10 rounded-sm border border-secundario bg-transparente">
                <form 
                    // className=" mt-10 bg-fondo shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate    
                    className=" px-2 md:px-10"
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <C_Boton
                        isLoad={isLoad}
                        text="Crear proyecto"
                        textLoading="Creando proyecto"
                    />
                </form>
                </Card>
            </div>
        </>

    )
}
