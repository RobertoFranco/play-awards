import React from 'react'
import { Alert } from 'antd';

const PasswordCriteriaAlert = () => <Alert
    message="Password criteria"
    description="Password must contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character and at least six characters long."
    type="info"
    showIcon />

export default PasswordCriteriaAlert;