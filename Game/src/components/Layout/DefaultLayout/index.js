import Header from "./header/index";
import Sidebar from "./Sidebar/index"


function DefaultLayout({children}) {
    return ( 
        <div>
            <Header>

            </Header>
            <div className="container" >
            <Sidebar>

            </Sidebar>

            <div className="content">
             {children}
            </div>
            </div>
        </div>
     );
}

export default DefaultLayout;
