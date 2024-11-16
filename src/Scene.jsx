import { NodeToyMaterial } from "@nodetoy/react-nodetoy";
import { useGLTF, useTexture } from "@react-three/drei";
import {data as sparkleShaderData} from "./sparkles-shader";

export default function Scene() {

    const {nodes} = useGLTF("/Models/scene.glb");

    const [ground, ground2, ground_debris, pipes_and_rover, astronauts_white, astronauts_orange, fragments,debris, ] = useTexture(["/Textures/ground.png","/Textures/ground2.png","/Textures/ground_debris.png","/Textures/pipes_and_rover.png","/Textures/astronauts_white.png","/Textures/astronauts_orange.png","/Textures/fragments.png","/Textures/debris.png",]);

    return(
        <>
        <mesh geometry={nodes.ground.geometry}>
            <meshBasicMaterial map={ground} />
        </mesh>

        <mesh geometry={nodes.ground.geometry}>
            <NodeToyMaterial data ={sparkleShaderData} />
        </mesh>

        <mesh geometry={nodes.ground2.geometry}>
            <meshBasicMaterial map={ground2} />
        </mesh>

        <mesh geometry={nodes.ground_debris.geometry}>
            <meshBasicMaterial map={ground_debris} />
        </mesh>

        <mesh geometry={nodes.pipes_and_rover.geometry}>
            <meshBasicMaterial map={pipes_and_rover} />
        </mesh>

        <mesh geometry={nodes.astronauts_white.geometry}>
            <meshBasicMaterial map={astronauts_white} />
        </mesh>


        <mesh geometry={nodes.fragments.geometry}>
            <meshBasicMaterial map={fragments} />
        </mesh>
        
         <mesh geometry={nodes.astronauts_orange.geometry}>
            <meshBasicMaterial map={astronauts_orange} />
        </mesh>

        <mesh geometry={nodes.debris.geometry}>
            <meshBasicMaterial map={debris} />
        </mesh> 

        <mesh geometry={nodes.astronauts_visors.geometry}>
            <meshStandardMaterial roughness={0} metalness={1} color={"#b68342"} />
        </mesh>

        </>

    )
}