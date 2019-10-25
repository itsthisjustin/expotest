import { PermissionsAndroid } from 'react-native';

async function checkPermission(type) { 
  const permissionType = selectType(type); 
  try {
    const permissionStatus = await PermissionsAndroid.check(permissionType);
    if (permissionStatus === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }      
}

async function grantPermission(type) {
  const permissionType = selectType(type);
  try {
    let granted = await PermissionsAndroid.request(permissionType);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false; 
    }
  } catch (error) {
    return false;
  }    
}

async function checkPermissionForImagePicker() {
  const checkWriteStatus = await checkPermission('WRITE_EXTERNAL_STORAGE'); 
  if(checkWriteStatus) {
    const cameraPermission = await checkCameraPermission(); 
    return cameraPermission;
  } else {
    const permissionWriteStatus = await grantPermission('WRITE_EXTERNAL_STORAGE');
    if(permissionWriteStatus) {
      const cameraPermission = await checkCameraPermission(); 
      return cameraPermission;
    } else {
      const finalStatus = await grantPermission('WRITE_EXTERNAL_STORAGE');
      if(!finalStatus) {
        return true;
      } else {
        return false;
      }
    }    
  }
}

async function checkCameraPermission() {
  const checkStatus = await checkPermission('CAMERA'); 
  if(checkStatus) {
    return true;
  } else {
    const permissionWriteStatus = await grantPermission('CAMERA');
    if(permissionWriteStatus) {
      return true;
    } else {
      const finalStatus = await grantPermission('CAMERA');
      if(!finalStatus) {
        return true;
      } else {
        return false;
      }
    }
  }
}

async function checkPermissionForAudioRecord() {
  const checkReadStatus = await checkPermission('READ_EXTERNAL_STORAGE'); 
  if(checkReadStatus) {
    const storagePermission = await checkStoragePermission(); 
    return storagePermission;
  } else {
    const permissionReadStatus = await grantPermission('READ_EXTERNAL_STORAGE');
    if(permissionReadStatus) {
      const storagePermission = await checkStoragePermission(); 
      return storagePermission;
    } else {
      const finalStatus = await grantPermission('READ_EXTERNAL_STORAGE');
      if(!finalStatus) {
        return true;
      } else {
        return false;
      }
      
    }    
  }
}

async function checkStoragePermission() {
  const checkWriteStatus = await checkPermission('WRITE_EXTERNAL_STORAGE'); 
  if(checkWriteStatus) {
    return checkAudioPermission();
  } else {
    const permissionWriteStatus = await grantPermission('WRITE_EXTERNAL_STORAGE');
    if(permissionWriteStatus) {
      return checkAudioPermission();
    } else {
      const finalStatus = await grantPermission('WRITE_EXTERNAL_STORAGE');
      if(!finalStatus) {
        return true;
      } else {
        return false;
      }
    }
  }
}

async function checkAudioPermission() {
  const checkAudioStatus = await checkPermission('RECORD_AUDIO'); 
  if(checkAudioStatus) {
    return true;
  } else {
    const permissionAudioStatus = await grantPermission('RECORD_AUDIO');
    if(permissionAudioStatus) {
      return true;
    } else {
      const finalStatus = await grantPermission('RECORD_AUDIO');
      if(!finalStatus) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function selectType(type) {
  switch(type) {
  case 'RECORD_AUDIO':
    return PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
  case 'CAMERA':
    return PermissionsAndroid.PERMISSIONS.CAMERA;
  case 'READ_EXTERNAL_STORAGE':
    return PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  case 'WRITE_EXTERNAL_STORAGE':
    return PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  }
}

export {
  grantPermission,
  checkPermission,
  selectType,
  checkPermissionForImagePicker,
  checkPermissionForAudioRecord  
};
