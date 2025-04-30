package com.qsp.Hospital_Management.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qsp.Hospital_Management.dao.AppointmentDao;
import com.qsp.Hospital_Management.dao.BillingDao;
import com.qsp.Hospital_Management.dao.PatientDao;
import com.qsp.Hospital_Management.model.Appointment;
import com.qsp.Hospital_Management.model.Billing;
import com.qsp.Hospital_Management.model.Patient;
import com.qsp.Hospital_Management.service.BillingService;


@Service
public class BillingServiceImpl implements BillingService {

	@Autowired
	private BillingDao billingDao;
	
	@Autowired
	private PatientDao patientDao;
	
	@Autowired
	private AppointmentDao appointmentDao;

	@Override
	public Billing saveBilling(Billing billing) {
		Patient patient = patientDao.fetchPatientById( billing.getPatient().getPatientId());
		Appointment appointment= appointmentDao.fetchAppointmentById(billing.getAppointment().getAppointmentId());
		if(patient!=null && appointment!=null) {
			billing.setPatient(patient);
			billing.setAppointment(appointment);
			return billingDao.saveBilling(billing);
		}
		else {
	        throw new RuntimeException("Invalid patient or appointment ID");
		}
		
	}

	@Override
	public List<Billing> getAllBillings() {
		return billingDao.fetchAllBilling();
	}

	@Override
	public Billing getBillingById(Long billId) {
		return billingDao.fetchBillingById(billId);
	}

	@Override
	public boolean deleteBillingById(Long billId) {
		return billingDao.deleteBillingById(billId);
	}

	@Override
	public Billing updateBillingById(Long billId, Billing billing) {
		return billingDao.updateBillingById(billId, billing);
	}

	@Override
	public List<Billing> getBillingsByStatus(String status) {
		return billingDao.fetchBillingByStatus(status);
	}

	@Override
	public List<Billing> getBillingsByPatientId(Long patientId) {
		return billingDao.fetchBillingByPatientId(patientId);
	}

	@Override
	public List<Billing> getBillingsBetweenDates(LocalDate startDate, LocalDate endDate) {
		return billingDao.fetchBillingBetweenDates(startDate, endDate); 
	}
	
	
}
