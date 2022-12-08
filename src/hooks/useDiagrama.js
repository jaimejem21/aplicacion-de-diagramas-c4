import { useCallback } from "react";

export const useDiagrama = () => {

    const DrawContainer = (id, title, tecnologia, description) => {
        return `Container(${id},"${title}","${tecnologia}","${description}")\n`;
    }

    const DrawContainerDB = (id, title, tecnologia, description) => {
        return `ContainerDb(${id},"${title}","${tecnologia}","${description}")\n`;
    }

    const DrawSystemExtern = (id, title, description) => {
        return `System_Ext(${id},"${title}","${description}")\n`;
    }

    const DrawRelation = (startId, endId, tecnologia) => {
        return `Rel(${startId},${endId},"Uses","${tecnologia}")\n`;
    }

    const DrawPerson = (id, title, description) => {
        return `Person(${id},${title},"${description}")\n`;
    }

    const DrawComponent = (id, title, tecnologia, description) => {
        return `Component(${id},"${title}","${tecnologia}","${description}")\n`;
    }

    // DrawSystemBoundary se crea de manera directa sin intermediario

    const executeDraw = useCallback((name, params) => {
        switch (name) {
            case "DrawPerson":
                return DrawPerson(...params);
            case "DrawContainer":
                return DrawContainer(...params);
            case "DrawContainerDB":
                return DrawContainerDB(...params);
            case "DrawSystemExtern":
                return DrawSystemExtern(...params);
            case "DrawRelation":
                return DrawRelation(...params);
            case "DrawComponent":
                return DrawComponent(...params);
            default:
                console.log("Error nombre useDiagram");
                return "";
        }
    }, []);

    return {
        DrawContainer,
        DrawContainerDB,
        DrawSystemExtern,
        DrawRelation,
        DrawPerson,
        executeDraw,
        DrawComponent
    }

}
