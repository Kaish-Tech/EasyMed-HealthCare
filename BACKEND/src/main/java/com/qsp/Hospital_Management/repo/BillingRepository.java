package com.qsp.Hospital_Management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qsp.Hospital_Management.model.Billing;

public interface BillingRepository extends JpaRepository<Billing, Long> {

	 List<Billing> findByPaymentStatus(String paymentStatus);

	    List<Billing> findByPatient_PatientId(Long patientId);

	    List<Billing> findByBillDateBetween(java.time.LocalDate startDate, java.time.LocalDate endDate);
}
