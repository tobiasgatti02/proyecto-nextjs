import Link from "next/link";
import Titulo from "../ui/components/titulo";
import Image from 'next/image';
import { SelectorCantidad } from "../ui/components/selectorCantidad";

const productosEnCarrito = [
    {
        imagen: "data:image/png;base64,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",
        titulo: "Vino Tinto Reserva",
        precio: 100
    },
    {
        imagen: "data:image/png;base64,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",
        titulo: "Vino Blanco Chardonnay",
        precio: 100
    },
    {
        imagen: "data:image/png;base64,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",
        titulo: "Vino Rosado",
        precio: 100
    },
    {
        imagen: "data:image/png;base64,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",
        titulo: "Vino Rosado",
        precio: 100
    },
    {
        imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAABO1BMVEX////u7u7t7e39/f3v7+/s7Ozw8PD5+fn8/Pz09PTy8vLx8fH+/v729vbp6erm5uaTkJLKyMqcmZuNi46zsLPBwMHnKSnQz9Hc29xtEBFICgtCCApZDQ64t7liYWQ9BwmCAABWAACPEhJiDg9PDA7VIyN2ERK9GxqEERGfFBR0cHOHg4V9fYCko6WVhojLwcOUZWWGb3LBsrPayMjfu7nq0c/f1NOVeHpuY2ZgWFtTREZUHB5pOTqsZWS9k5S0pafAenVuTU5FHSFUJSZlP0BiTE8qCxC4QTqoMi6MQ0PHpKPTmJSETE1sKip8OjtCJSY0IySVAACXPTuyV1HZiYGXW1wxGBquR0WmeHhxHiCohYVPNjlAPEAwBAWIICLTMy7jWE7jaFvIWE7acWS1LSuAMTLtQj0kHiMAAACV8jr0AAARRElEQVR4nN1d+0PTutvvvU0v61Y22sEGuvsYw8k5rzhF8QI6PIgKcvCyI15A/f//gjdtk7TNVtaxDeY3+gNP0z5PP03yXJInGcP4hdc4FhZOUNAFyaNZTka04dOigWhZ9OtVTAs+AwkzRM9rmKGAGPA+qQNEYwGIZrEALBBghlig7tMKYsgyil9koHlFldEFRGuYNhBtUDTADFSKxvUxDGUjoQAjhiEWqDE+Ek5CH0tXox8LfwyOfBz0AP44uDWAHv1YAqpXNMQAM0TNK1BfnzQ3Zkia2xfI4uZVBNS8mCGCwAo0BCUqgaUhEAkcBQHdT0NgCQR2KASR6rG0AAJBnhoEEJYgyLLMo4LegHw0zWMvEAjadCCwU4agZS3bTLEpWFTTLfAP2SuKLHHuZdM0WEewbX5arTAFCGEJgrBeNDXJAAYs7vuLKVPSvWHHw47kF13iGSdnXBmChpt1Jq0gmG0G1/OCqnk9B0vEY0HXZAYUpRl0JPSNQhC8QjQSEP0Lgbr2S6CROE6ys3KgkRDDAAJqBdek5ESokfx6/MpYIIHgMwgMEHo+0Eg+HUBQ/UK0rYEuEHWNaCOGlt17c7YcqGvEkBgczNCQFSZj8iAqUBklMI4hYcAgPaIAQXKLhjSLrvq0hDWN4dOCgWgZ0UDneSYrMoZ/u6BihogGCrqgug/btoZoBTOkBEhYAGaIaUWIMlQ09ABujMkcDMtI5GBwqpMDuMdOz8EgEKLDGo86GgJHQ/AkpGG9EB11PEtD8MZgUaYgcLEQKNWnDEBgYyBgjtIYEIxsoCguhwCKBuXmjYSAW2G2EOxMAghSyoWQEZm5hJCVEkOwnVgI7MQQKAdyHAgWk7QjSakcBSF+OF8ZAvlo6AZaIxGfmCMS+HQAgWgkfWjIw8nZxBCobzagkSSskUZZZ2yNaesctAYnZqEFxdZZoY0pts5IQJa2zmBM6ywPWGf0sa/uI4mSaYPk8ULGlKI9dlwfaQZunmjYjpQcgmMbk0GYQbwgyplxIKRy8vxBMIopITkEOTN/rcCpRW2c2Dl3bRD4qIR4CILpvtRoCDrikEkJl0OgZzBGDmfBL5qiY6fbKyz2kQ3Wv2D49bqB6jEtA9uGz7DEB8YMdUSr6AKq123HEyHJiAHwBbCIxgIDAVGGuiz5tIrfkMQLqkTFC1KieEECjG26TGR0PxUvSOF4was3HWZYvKCDZPECYYjf+JJ4AXWYUfECgJo+1EW5yx0M2IHEjN9jY6xz7JzbYLyAxkAAgY2OsuQ+UoYLQRjhI7kSchEI8+CpyhlpLAhGxpgxhLGjNjEDGF1JDIGT7dRQCMaNRW2GYyvhVsAzVrEQeMeZVSvQznbC8N/w32hwOA842+iVoJcUhjDS2R49nLHKAlElGjsJg2miVG1fScoa0sqUUiXqG9ULupkJC4yfhKG0OK1UsUAJTYUFCw9A8y8EKxdDp8LIygXIOe4tmhGdCguWShDDYKrLzEggTA8XqFFTYTTDYO1l4glJNWe6QY04ckKSMDQzJjvVCUnUoa7s5qVyKYlN5ub5L6mmco46V56qkxWFhBD8OzQx54C5mpx3shqbEIJfNClzJQizbAWQGIJ3i6Rl7LmAwBIIRWNcCLatClfvSIMQRL+wxLFAF3QsAdEEAqIRBD6TUcM01Eh+wRB4CV0gECQnBxUOmaBSUb1MCQhsaJShwvq0hN8wiBdQYIFNm4YijcDyoNAHmzYvMpG4om/ZeBKJEEsUjUwIQ4VJFTk9iK2wQFoATSso9gqtL/iFIKHdvGTxgsBlU9H2Henm8QwoileYkJxVvCCk2u4NylgQ5Kw5R/GCYOI50jEgMMW5guB4EHR9PAjOPEEwi1QrjI4XIAT7WqK2pBDwesFYrWDPaH0hOmeO6ND6AjUp798egoAcSAIB0UEMRSbpcz4EykNFAuNWARTkAqvIpCmYIb10TuKBZEvnvGkjfx7HC0rs0jmu15RMTh5cOqeXymOXzuk3xilV8ROS1PwgtRxs2v6FUSlVQbwgiUYmB4LmVWkHY/iEZDhe8HvotHwk0zHYKIRRnqrEQQjGHLh5eJQ5DhgTgsYZuew8QUiZwvitMCcQEA07kiqBsSCwcjEH5ihqc7KynbFZKQRBgmP3EghAAFZGmuZyIfJYJUX3Co+m+zlE62R9gfFIBk//A49mUpbZbm1kNM1A9/OplJlKsfh+XdHQA4qHkTec4p2WDR1lGTEk6wtMRCCLGDIyegEN1cuSd4HV8BsyMioG8IpB0YCmjQhtsFau1erc3bwnMrx3IWXf+cuxN//+P1V3bzEUHj0AeMW5d6e9sXX3/lpKiWMYT8sx9dh6B9aZNqax0zsezWrtlW7rwcPtR48e39OhmXJsJ7O5ufPoyZPHmyLslMI9W/JZ6ObG093tZ89393Zbkmudxah1BpQ1RtY5FA4i6xzkIyHrTCCgMUEcDNTnR0wLG8UXe91061npZW//8as7Dix3Xv3z5ODg5ODgMQuMndeHlqGYzl/3sge3lpaXn735fHC4w8/T5Dxw7t/JvO22t5q33r0rlY5e3Tk4fv9k/+Kod3yY3zI3DrasomMdnJy8Xr5dWP3vxdKb7f1D16+aG2eb1VKt3TuW9e96cfPxyWmvd6v3aXPzw9HB6f7+h7/ElG06j7c+vu7sLldWV1f/XS1U3uwedMy5giBo2QfPdj+/eLHaXbesV08eHZ/cczY/fXqys+kAODTMnY0P+wefb1eWKrANlhsftw8eWPL1QEi6ymPYK/2l/95WGrcatyu7dy2rbTsmp5n3THNzZ2dnY2u7cPt2rbZUqCz/9+JF7ejlyVNvvXD6KVW6RM0nCQmnd4Cx9vbN818vCo1SqdSo1b5sH3Q6nQ+PTv553Gnk87dvLy2tVgrl5Rqszp+fff32/a6f2wYoAYgONFJ0worRER1AQBcYrF2J9lU9UiX2ANGG4qeRI3VMaFkp7m5vl2vlMnz/fCPfePfuFmyRdxBRrby0DP/B/6uFfLleqp59+/by0X5bCet3xbhcILEHAAuk3zhpAgO9HEw+jiylVp5uPy/VKoVKs5bPN8pLS5VaoVCpfCwvNQqrq8uwLFXyq41mFTbB8fEe8m0nTGCYXrwAOxST3e1+rlTq1cVqqVbK5wvw/ZcrXinALgQxrJbLsDc1v377cfyhk2aig+7GnW0IAQh7j0565Wa9Xm/WF+F4aDYb9Wa5UMjny/lavgzHcd4F1vz248f7D7uO/07zBAH6ILmLzv6zUrNWrVerpUZ9sbq4WG3WaqVmtQkxVGCzQCzlox/v3/9zkkavMFcQWEFf63b7X6qFqlvqiy4E2CSlRvXs6GOtXCqXYBt8+fL9+P3fr/ZYxODmIbAhCBxwuvf3Xp97n38RtgQEUXf71dn5eRU2BFS2jcbF0Uln59XT3Ay2YODZewIhWA7wJVy+vuDbBznbX3lwDsfCotsEsCmaEEizefrz69fzRiFfqi7Wj4466VdrC4DBBmjc9QWikfD6AoFA1DEqNG0koo30ysop7D0+gjpshCY0A73zn9u9egOO9GZvfy/996c1UxkQkFRg7AMYCa957nhgnSUxSbzAiWiDpLnW7bw8r3uv33Abo1mC6un06PwcDvNmo3d6vJG1uhlZDDZI0vHC8AVuOl4IW+cR8cI4Odtuse93DraPzs4giJI7nOGXr1dL9UU4qkvN89PTrU2r3wYS2WU4i7TzCSEwxafHe697Z2f1ujeo3QZpNiGeRrPZOz36sLPTT8sadwmEm3K2AwlGZnetc9SDxsBXqxBGo1GDAEq13kVnZ+OXZagsO88QZEmxu1swXuv9/HnmAvhZ9cx1vQn91Y7V+tWWvemYa4Bwpb08Ls2Kht1f+3T45fS8elbv9c56Tbc7NaAPu7ew9raN3bM4CHFZYRPvX0iQIYkhsJxirq/cfXRyevzj2+m34x8/fpxfvH748N+D9e4DG+doxW/ZFikIXFRA/I4qWgsjPT+GXTACmmet7tPP2xfH30+/n748Pfrycfv18wcP+i1HodW6kYjhJXaB1A/mIyH1S+UjiXHqGtsHPCGZWfv8+VmlsH9xcQFd7cPb27tv+0VgBAyRwQlZZ2q1Z7gBCtYX/OUjccqbhUPTwkwqe3/vU+fw4vD59u7Dw87em5Yju0wn3e8cn4MxbQi8CgTTzFmfPtzd6GylLctRVU/olHedjwFhlKIYgCCyAjDb7Wy73U6vr7R57NpOCmG2+50jEDhXNdn99db6SrffJaruBlvhKhBYjln7tZ5e6/+2p3d8QfxYSKiRYh1IWiN5DqVr5VJGbqWvMIpEMURT5sk1EkdpJIHWSMaMSp9hnJWVmbEPFYwkbkKS3l040L7Bhhi/HrW3vqYyTr+tixpt7q+8WRjVB6v/6A0HIIyXgxHe0xMddW2Hyf2y5aE5GGEI9Bi4SU+VyoSxchCCCUZCmCdnm2qFbNaFIPzJEHJtpvgr9UdCwB3JbjPZPjcGBGzFJ40XuNAMBiXBp+OPeGJ9BrgVTAtCkLgxjngaSLnxbkhwAgPxxqllXXoWf9Q6NPUAL6b1bDe+PunCdvy6M2E4ndk8lybW2eeXWpCzK0aQLRzKR5rSbB7JFkYdauw5VTrjiUojEcQFo70mz+6Ip1m7eS6Elmb98RAka0H5kyGw3EJqXiCM2vR3CYT0VCHER22+8x7JkHQvxMcLKP80Gi9EAk/vAps2FxAEv1DxArWjKrLimSReGHbEE9a2OE8Vq2ecNhpDy8NpIFjmQlpW5CBPNSoAC1SSCgDKcAYY+lVW/zl/MR7TbFR9exA0LliMwQxpgzP56j8qV87BiHPzJBeCOjxn23ujGfhIFIRJ3byxIcyPp4pbQW3fGIQrT85TEEDbSVt/ZivgjgSyzsJ1Q4jOJyXMkOTC8UJEfYO2DSFE4oXIfNIUMyRHue+j4oPYNNMshCAniBeumqcaxAsD2cL4NBJ9aPJu6DQSlLyLd8zxKDsY0ZILATIJTiNBD6AddZKMaLJFL0YgOo2EDbKF8Z4/nC3MRodxnJuX/FRbPGNVzEAI0/ORuPic7YQQxnXzBJCbLoRrnpx3+U27FW4gXph/CCNjZwAhpK8TwiU7qmgI+JUxx5hDqqVcFAJ9SPW4O6pCGZL+hFUAQXJPxNDIiRv+CRuaJpFjT90bNOrYIlgP8L5nXI8f8OolDQ7nVtqtB161JAXnJGla6CAm3q/X8JkhrkCPJhurNf95NUIHb0yQoHykkHVOmI8UrP77NP5YRha2gsoF6wtCdLVndD4SJUAfOx9pUjfPhzDaR5rmHk8KwqTOdlIIc+ip/g9AwEZ0DiBMPhZy1w4BmaQr5yMNQkintUEI4/6ERIJ8JH/PMDlxCapr/0Jwbp5PkxOX0APkiCdUj09cUlE9hGBZkCmgGSo82udMzoyKCID2ANFSVGBwxFNUoDSrn5BgQRG2wiXWeQ5+QmKUmweyxenOqU7/JyRGTQvHQpjTn5AYDmFh/Y9eImGNdtaaKoRrj9oghPbwtbY5+AmJoesLHBfJR+I4VrXabXfFM+H6wiQnto34BaDEv/hD0Sqw2lYX6niZZkj/htGonxgiPylEzsGI0gr+dSRs2lRsaWhThyyNREybNNy0YRqk21YfRibYtCkDpo22nUigESMwOGMWCRxyJCwV8nDDQp6IgxGdkBSi7a0uQAgCe8mEpN/h6AlJ6kCVSAJDzIQkgRAd1hO7ecJ6O90Xp5BGQrLCrj1eYNes9Ns/M5kHQxBX0gt/eEqV+GCh9dtUbyJemBYEs99a+23L4nWmFw4PeZL8hEQYAtFImX679SvNiMlTqmJCHkzH/4QEetPQaST+ncH6AuJM1heiNHbng/UFr/Ct3yvdX31GV1R0A1lfQALJ+gL+VjECg6CcnEbiFbK+8P91lEGoJ/MHNgAAAABJRU5ErkJggg==",
        titulo: "Vino Rosado",
        precio: 100
    }
];

export default function Carrito() {
    return(
        <div className="text-white flex justify-center items-center px-10 sm:px-8 pt-32">
            <div className="flex flex-col w-[1000px]">
                <Titulo titulo='carrito' className="text-2xl "/>
                <Link href="/compras" className="underline mb-10 max-w-[300px]">
                            continúa comprando
                        </Link>
                    
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito*/}
                    <div className="flex flex-col ">

                    {/* Items en carrito*/}
                    {
                        productosEnCarrito.map((producto, index) => (
                            <div key={index} className="flex mb-5 shadow-2xl border rounded-lg border-black">
                                <Image 
                                    src={producto.imagen}
                                    alt={producto.titulo} 
                                    width={100} 
                                    height={100}  
                                    className="mr-5 rounded" />
                                <div>
                                    <p>{producto.titulo}</p>
                                    <p>${ producto.precio }</p>
                                    <SelectorCantidad cantidad={1}/>
                                    
                                    <button className="underline mt-3">
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    </div>

                    {/* Checkout*/}
                    <div className="text-black bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2"> Resumen de la Compra</h2>
                        <div className="grid grid-cols-2">
                            <span>cantidad de articulos</span>
                            {/*cantidad de elementos en la variable productosEnCarrito*/} 
                            <span className="text-right">{productosEnCarrito.length}</span>

                            <span className="mt-5 text-2xl">Total</span>
                            {/** sumar los precios de todos los productos en la variable productosEnCarrito multiplicados por la cantidad de articulos de ese tipo*/}
                            <span className="text-right text-2xl mt-5">
                                ${productosEnCarrito.reduce((acc, producto) => acc + producto.precio, 0)}
                            </span>
                        </div>
                        <div className="mt-5 w-full mb-2">
                            <Link
                                href="/pagar"
                                className="flex bg-blue-400 rounded-2xl justify-center">
                                Ir a Pagar
                            </Link>
                        </div>             
                    </div>
                </div>
            </div>
        </div>
    )
}