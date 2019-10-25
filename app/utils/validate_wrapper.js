import validation from 'validate.js';
import validattionsList from './validattionsList';

export default function validate({ fieldName, title, value }) {
  var formValues = {};
  formValues[fieldName] = value;
  
  var formFields = {};
  formFields[fieldName] = validattionsList[fieldName];
  
  if (fieldName === 'normalText') {
    var titleMain = title ? title : 'TextField';
  }
  
  const result = validation(formValues, formFields);
  if (result) {
    return fieldName === 'normalText'
      ? titleMain + ' ' + result[fieldName][0]
      : result[fieldName][0];
  }
  return null;
}
