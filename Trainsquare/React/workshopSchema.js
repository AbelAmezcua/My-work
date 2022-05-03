import * as Yup from 'yup';

const workshopSchema = Yup.object().shape({
    name: Yup.string().min(2).max(255).required('Is Required'),
    summary: Yup.string().min(2).max(255).required('Is Required'),
    shortDescription: Yup.string().min(2).max(4000).required('Is Required'),
    venueId: Yup.number().min(1).required('Is Required'),
    workShopTypeId: Yup.number().min(1).required('Is Required'),
    workShopStatusId: Yup.number().min(1).required('Is Required'),
    imageUrl: Yup.string().min(2).max(400).required('Is Required'),
    externalSiteUrl: Yup.string().min(2).max(400).required('Is Required'),
    languageId: Yup.number().min(1).required('Is Required'),
    isFree: Yup.bool(),
    numberOfSessions: Yup.number().min(1).required('Is Required'),
    dateStart: Yup.date().required('Please pick a date'),
    dateEnd: Yup.date().required('Please pick a date'),
});

export default workshopSchema;
