package com.qsp.Hospital_Management.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.Hospital_Management.model.Billing;
import com.qsp.Hospital_Management.repo.BillingRepository;

@Repository
public class BillingDao {
	
	@Autowired
	private BillingRepository billingRepository;
	
	public Billing saveBilling(Billing billing) {
		return billingRepository.save(billing);
	}
	public List<Billing> fetchAllBilling(){
		return billingRepository.findAll();
	}
	
	public Billing fetchBillingById(Long billId) {
		return billingRepository.findById(billId).orElse(null);
	}
	
	public boolean deleteBillingById(Long billId) {
        if (billingRepository.existsById(billId)) {
            billingRepository.deleteById(billId);
            return true;
        }
        return false;
    }
	
	public Billing updateBillingById(Long oldBillId, Billing newBilling) {
		newBilling.setBillId(oldBillId);
		return billingRepository.save(newBilling);
	}

	public List<Billing> fetchBillingByStatus(String status) {
        return billingRepository.findByPaymentStatus(status);
    }

 
    public List<Billing> fetchBillingByPatientId(Long patientId) {
        return billingRepository.findByPatient_PatientId(patientId);
    }


    public List<Billing> fetchBillingBetweenDates(LocalDate startDate, LocalDate endDate) {
        return billingRepository.findByBillDateBetween(startDate, endDate);
    }
}
