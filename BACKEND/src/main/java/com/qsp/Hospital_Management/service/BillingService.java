package com.qsp.Hospital_Management.service;

import java.time.LocalDate;
import java.util.List;

import com.qsp.Hospital_Management.model.Billing;

public interface BillingService {

	Billing saveBilling(Billing billing);

    List<Billing> getAllBillings();

    Billing getBillingById(Long billId);

    boolean deleteBillingById(Long billId);

    Billing updateBillingById(Long billId, Billing billing);

    List<Billing> getBillingsByStatus(String status);

    List<Billing> getBillingsByPatientId(Long patientId);

    List<Billing> getBillingsBetweenDates(LocalDate startDate, LocalDate endDate);
}
