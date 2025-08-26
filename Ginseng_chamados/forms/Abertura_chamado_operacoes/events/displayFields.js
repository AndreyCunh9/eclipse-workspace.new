function displayFields(form, customHTML) {

    var activity = getValue('WKNumState');
    var userId = getValue('WKUser');

    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    form.setValue("WKNumProces", getValue('WKNumProces'));
    form.setValue("activity", activity);
    form.setValue("formMode", form.getFormMode());

    var c1 = DatasetFactory.createConstraint("colleagueId", userId, userId, ConstraintType.MUST);
    var filter = new Array(c1);
    var fields = new Array("colleagueName");
    var retorno = DatasetFactory.getDataset("colleague", fields, filter, null);

    //requester
    if (activity == 0) {
        form.setValue("requesterName", retorno.getValue(0, "colleagueName"));
        form.setValue("requesterMail", retorno.getValue(0, "mail"));
        form.setValue("requesterId", userId);
    } else {
        form.setValue("currentUserName", retorno.getValue(0, "colleagueName"));
        form.setValue("currentUsermail", retorno.getValue(0, "mail"));
        form.setValue("currentUserId", userId);
    }
}