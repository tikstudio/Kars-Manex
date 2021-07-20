import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import Avatars from "./Avatar";
import CircleLoad from "../loads/CircularLoading";
import EditProduct from "../products/editProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSave, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Input from "../form/Input";
import moment from "moment";
import ResInfo from "./ResInfo";
import 'moment/locale/hy-am';
import Access from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    padding: '20px',
    textAlign: "center",
  },
}));

export default function Accordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [updateKey, setUpdateKey] = React.useState();
  const [userFormData, setUserFormData] = React.useState({});
  const [process, setProcess] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeUpdate = (up, k) => {
    setUpdate(up);
    setUpdateKey(k);
  };
  const handleChangeValue = (path, ev) => {
    _.set(userFormData, path, ev);
    setUserFormData(userFormData)
  }
  const handleSubmit = (id) => {
    const {onUpdate, newRequest} = props;
    _.set(userFormData, 'id', id);
    setUserFormData(userFormData);
    onUpdate(userFormData, (v) => {
      setProcess(v.loaded / v.total * 100)
    }, () => {
      console.log()
    }).then(() => newRequest())
  }

  const {data, status, deleteInfo, delErrors, updateInfo, upErrors, onDelete, newRequest, cacheDelete} = props;
  const avatar = "/images/icons/loginIcon.png";
  return (
    <div className={ classes.root }>
      { _.map(data, (v, k) => (
        <Accordion key={ k } expanded={ expanded === `panel1${ k }` } onChange={ handleChange(`panel1${ k }`) }>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon/> }
            aria-controls={ `panel${ k }bh-content` }
          >
            <Typography>{ v.id }</Typography>
            { updateKey === k && update === true ? (<>
                <div className={ classes.heading }>
                  <Avatars
                    src={ v?.avatar || avatar }
                    alt="avatar"
                    id={ "all__users_avatar" }
                    onError={ ev => {
                      ev.target.src = avatar
                    } }/>
                </div>
                <div className={ classes.heading }>
                  <Input
                    className={ 'user__update_input' }
                    size={ 'small' }
                    label={ upErrors.firstName ? "Սխալ" : "Անուն" }
                    name={ "firstName" }
                    type={ "text" }
                    errors={ upErrors.firstName ? upErrors.firstName : null }
                    placeholder={ "Անուն" }
                    title={ userFormData.firstName ? userFormData.firstName : v?.firstName }
                    onChange={ (event) => handleChangeValue('firstName', event.target.value) }
                    defaultValue={ v?.firstName }/>
                  <br/>
                  <Input
                    className={ 'user__update_input' }
                    size={ 'small' }
                    label={ upErrors.lastName ? "Սխալ" : "Ազգանուն" }
                    name={ "lastName" }
                    type={ "text" }
                    errors={ upErrors.lastName ? upErrors.lastName : null }
                    placeholder={ "Ազգանուն" }
                    title={ userFormData.lastName ? userFormData.lastName : v?.lastName }
                    onChange={ (event) => handleChangeValue('lastName', event.target.value) }
                    defaultValue={ v?.lastName }/>
                  <br/>
                </div>
                <div className={ classes.heading }>
                  <Input
                    className={ 'user__update_input' }
                    size={ 'small' }
                    label={ upErrors.email ? "Սխալ" : "Օգտանուն" }
                    name={ "email" }
                    type={ "email" }
                    errors={ upErrors.email ? upErrors.email : null }
                    placeholder={ "Էլ. փոստ" }
                    title={ userFormData.email ? userFormData.email : v?.email }
                    onChange={ (event) => handleChangeValue('email', event.target.value) }
                    defaultValue={ v?.email }/>
                  <br/>
                  <Input
                    className={ 'user__update_input' }
                    size={ 'small' }
                    label={ upErrors.phone ? "Սխալ" : "Հեռախոսահամար" }
                    name={ "phone" }
                    type={ "tel" }
                    errors={ upErrors.phone ? upErrors.phone : null }
                    placeholder={ "+374########" }
                    title={ userFormData.phone ? userFormData.phone : v?.phone }
                    onChange={ (event) => handleChangeValue('phone', event.target.value) }
                    defaultValue={ v?.phone }/>
                </div>
                <div className={ classes.heading }>
                  <Input
                    className={ `user__update_input` }
                    size={ 'small' }
                    label={ upErrors.work ? "Սխալ" : "Գործունեություն" }
                    name={ "work" }
                    type={ "text" }
                    errors={ upErrors.work ? upErrors.work : null }
                    placeholder={ "Գործունեություն" }
                    title={ userFormData.work ? userFormData.work : v?.work }
                    onChange={ (event) => handleChangeValue('work', event.target.value) }
                    defaultValue={ v?.work }/>
                </div>
                <Typography className={ classes.secondaryHeading }>
                  { moment(v?.createdAt).locale('hy-am').format('LLL') }
                </Typography>
                <Tooltip className={ classes.heading }
                         onClick={ (event) => {
                           event.stopPropagation();
                           handleSubmit(v.id)
                         } }
                         onFocus={ (event) => event.stopPropagation() }
                         title="Save" arrow>
                  <Button>
                    <FontAwesomeIcon style={ {color: 'green'} } icon={ faSave }/>
                  </Button>
                </Tooltip>
                <Tooltip className={ classes.heading }
                         onClick={ (event) => {
                           event.stopPropagation();
                           handleChangeUpdate(false, k);
                         } }
                         onFocus={ (event) => event.stopPropagation() }
                         title="Look" arrow>
                  <Button>
                    <FontAwesomeIcon style={ {color: 'orange'} } icon={ faEye }/>
                  </Button>
                </Tooltip>
              </>) :
              <>
                <Avatars src={ v?.avatar || avatar }
                         alt="avatar"
                         id={ "all__users_avatar" }
                         className={ classes.heading }
                         onError={ ev => {
                           ev.target.src = avatar
                         } }/>
                <Typography className={ classes.heading }>{ v.firstName + ' ' + v.lastName }</Typography>
                <Typography className={ classes.heading }>
                  { v.email }<br/>
                  { v.phone }
                </Typography>
                <Typography className={ classes.heading }>{ v.work }</Typography>
                <Typography className={ classes.heading }>{ v.status }</Typography>
                <Typography className={ classes.secondaryHeading }>
                  { moment(v?.createdAt).locale('hy-am').format('LLL') }
                </Typography>
                <Tooltip className={ classes.heading }
                         onClick={ (event) => {
                           event.stopPropagation();
                           handleChangeUpdate(true, k)
                         } }
                         onFocus={ (event) => event.stopPropagation() }
                         title="Edit" arrow>
                  <Button>
                    <FontAwesomeIcon style={ {color: '#5151af'} } icon={ faUserEdit }/>
                  </Button>
                </Tooltip>
              </>
            }
            <Access
              label={ "Վստահ եք, որ ուզում եք ջնջել այս հաշիվը?" }
              text={ 'Ջնջելով այս հաշիվը, ջնջվում են նաև\n' +
              'բոլոր տվյալները և հայտարարությունները։' }
              onClick={ () => onDelete(v.id) }
              button={ true }
            />
          </AccordionSummary>
          <AccordionDetails>
            <div className='user__products_list'>
              { status === "request" ? <div className="centering"><CircleLoad/></div> : status === "success" ?
                <EditProduct
                  style={ {width: '27%'} }
                  product={ v.products }
                  thenFunction={ newRequest }/> : _.isEmpty(v.products)
                  ? <p className="centering">Հայտարարություն չկա</p> : <p className="centering">Սխալ</p>
              }
            </div>
          </AccordionDetails>
        </Accordion>
      )) }
      { updateInfo?.result || updateInfo?.e || updateInfo?.p ?
        <ResInfo value={ updateInfo?.result[0] === 1 || updateInfo?.e[0] === 1 || updateInfo?.p[0] === 1 ? 'on' : null }
                 successFunc={ cacheDelete }
                 res={ 'success' } msg={ `Օգտատիրոջ տվյալները հաջողությամբ թարմացվել են։ ${ process }%` }/> : null }
      <ResInfo value={ upErrors ? 'on' : null }
               res={ 'error' } msg={ 'Տվյալների թարմացման սխալ!' }/>
      { updateInfo?.result && updateInfo?.e && updateInfo?.p ?
        <ResInfo value={ updateInfo?.result[0] === 0 && updateInfo?.e[0] === 0 && updateInfo?.p[0] === 0 ? 'on' : null }
                 successFunc={ cacheDelete }
                 res={ 'warning' } msg={ 'Տվյալները չեն թարմացվել' }/> : null }
      { deleteInfo?.result ?
        <ResInfo value={ deleteInfo?.result === 1 ? 'on' : null }
                 successFunc={ cacheDelete }
                 res={ 'success' } msg={ 'Օգտատերը հաջողությամբ հեռացվել Է։' }/> : null }
      { deleteInfo?.result ?
        <ResInfo value={ deleteInfo?.result === 0 || delErrors ? 'on' : null }
                 res={ 'error' } msg={ 'Հեռացման սխալ!' }/> : null }
    </div>
  );
}
