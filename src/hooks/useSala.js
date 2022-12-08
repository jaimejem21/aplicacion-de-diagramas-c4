import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiDiagrama } from '../api/apiDiagrama';
import { authContext } from '../context/authContext';

export const useSala = (InitialState = null) => {

    const { auth } = useContext(authContext);
    const [sala, setSala] = useState(InitialState);
    const [isAnfitrion, setisAnfitrion] = useState(false);
    const [error, seterror] = useState("");
    const [validate, setvalidate] = useState(true);

    const { idsala } = useParams();

    const getSala = useCallback(async () => {

        const res = await apiDiagrama(`/sala/getOne/${idsala}`);

        if (!res.ok) {
            setvalidate(false);
            seterror("El id es invalido!!!");
            return;
        }

        setvalidate(false);

        const { data } = res;
        const { anfitrion, usuarios, active } = data;

        if (!active) {
            seterror("La sala no esta activa!!!");
            return;
        }

        if (anfitrion === auth.id) {
            setSala(data)
            setisAnfitrion(true);
            return;
        }

        const result = usuarios.find((elemet) => elemet === auth.id);

        if (result === undefined) {
            seterror("No tiene permiso del anfitrion!!!");
            return;
        }
        seterror("");
        setSala(data);

    }, [auth.id, idsala]);

    useEffect(() => {

        getSala();

    }, [getSala]);

    return {
        sala,
        error,
        auth,
        isAnfitrion,
        validate
    }
}
