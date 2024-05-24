import { maven_Pro } from "../../fonts";
 
interface Props{
    titulo: string;
    subtitulo?: string;
    className?: string;
}

export const Titulo = ({titulo, subtitulo, className}: Props) => {
    return(
        <div className={`mt-3 ${className}`}>
            <h1 className={`${maven_Pro.className} antialiased text-4xl font-semibold my-10`}>
                {titulo}
            </h1>
            {
                subtitulo && (
                    <h3 className="text-xl mb-10 ">{subtitulo}</h3>
                )
            }
            
        </div>
    )
}

export default Titulo;