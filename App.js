import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { AirlineSeatFlatAngled } from '@material-ui/icons';

function App() {

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function Header() {

  return (

    <div className="headercontent">
      <h1>Shop in style</h1>
    </div>


  )

}





function Content() {

  const flagdata={1: true, 2: true ,3: true,4:true,5:true,6:true,7:true,8:true}
  const [itc, setct] = useState(0)
  const [flag,setflag]=useState(flagdata)

  var data = [
    { id: 1, type: "Fancy Product", sale: "no", rating: "no", prize: "$40.00 - $80.00", discount: "no"},
    { id: 2, type: "Special Item", sale: "yes", rating: "yes", prize: "$20.00", discount: "$18.00"},
    { id: 3, type: "Sale Item", sale: "no", rating: "no", prize: "$50.00", discount: "$25.00" },
    { id: 4, type: "Popular Item", sale: "yes", rating: "yes", prize: "$40.00 - $80.00", discount: "no" },
    { id: 5, type: "Sale Item", sale: "yes", rating: "no", prize: "$50.00", discount: "$25.00" },
    { id: 6, type: "Fancy Product", sale: "no", rating: "no", prize: "$140.00 - $280.00", discount: "no"},
    { id: 7, type: "Special Item", sale: "yes", rating: "yes", prize: "$50.00", discount: "$25.00" },
    { id: 8, type: "Popular Item", sale: "", rating: "yes", prize: "$40.00 - $80.00", discount: "no" }
  ]

  
  const [products, setproducts] = useState(data)
  const [cartitem, setcartitem] = useState([])
  var flagcopy={}
  
  function addtocart(id, type, prize,flag,setflag) {
    
    flagcopy=Object.assign(flagcopy,flag)
    flagcopy[id]= !(flagcopy[id])
    setflag(flagcopy)
    setct(itc + 1)
    console.log(id, type, prize)
    setcartitem([...cartitem, { id: id, type: type, prize: prize }])

  }

  

  function handlecart() {
    console.log(cartitem)
  }

  function removeitem(id){
    flagcopy=Object.assign(flagcopy,flag)
    flagcopy[id]= !(flagcopy[id])
    setflag(flagcopy)
    setct(itc -1)
    setcartitem(cartitem.filter((e)=> e.id!==id))
  }


  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handlecart()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <div>
        <Button className="cartbt" variant="contained"
          onClick={handleClick}
        >
          <b> Cart </b>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={itc} color="secondary" showZero>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>

          {
            cartitem.map((e) =>

              <StyledMenuItem>
                <div class="cartlist">
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="prodcut:" />
                  <ListItemText primary={e.id} />
                  <ListItemText primary={e.type} />
                  <ListItemText primary={e.prize} />

                  <ListItemIcon>
                    <Fab size="small" color="secondary" aria-label="add" 
                    >
                      <DeleteIcon fontSize="medium" onClick={()=>removeitem(e.id)}/>
                    </Fab>

                  </ListItemIcon>
                </div>
              </StyledMenuItem>

            )
          }
        </StyledMenu>
      </div>

      <div className="maincontent">
        {
          products.map((e) =>
            (<Card id={e.id} type={e.type} sale={e.sale} rating={e.rating} prize={e.prize} discount={e.discount} itc={itc} setct={setct} addtocart={addtocart} flag={flag} setflag={setflag}/>)
          )
        }

      </div>

    </div>

  )


}


function Card({ id, type, sale, rating, prize, discount, itc, setct, addtocart,flag,setflag}) {

  
  return (
    <div className="card">
      <div className="container">
        <img className="disimg" src="https://static.doofinder.com/main-files/uploads/2018/03/abandoned-cart-carritos-abandonados.jpg"></img>
        {sale === "yes" ? <div className="top-right">Sale</div> : ""}
      </div>
      <h1>{type}</h1>
      <h4>product:{id}</h4>
      <div className="dis">
        <p>{rating === "yes" ? <p>⭐⭐⭐⭐⭐</p> : ""}</p>
        {discount === "no" ? <p>{prize}</p> : <p><s>{prize}</s><span> - {discount}</span></p>}
      </div>
      {
        flag[id]?
      <Button variant="outlined" onClick={() => addtocart(id, type, prize,flag,setflag)}>
        Add to cart</Button>
        :
      <Button variant="outlined" color="secondary">
        Item added</Button>
      }
    </div>
  )
}





export default App;
